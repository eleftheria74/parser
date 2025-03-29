const Cleaners = require('../cleaners');
const { convertNodeTo, makeLinksAbsolute } = require('../utils/dom');
const GenericExtractor = require('./generic');

function cleanBySelectors($content, $, { clean }) {
  if (!clean) return $content;
  $(clean.join(','), $content).remove();
  return $content;
}

function transformElements($content, $, { transforms }) {
  if (!transforms) return $content;

  Reflect.ownKeys(transforms).forEach(key => {
    const $matches = $(key, $content);
    const value = transforms[key];

    if (typeof value === 'string') {
      $matches.each((index, node) => {
        convertNodeTo($(node), $, transforms[key]);
      });
    } else if (typeof value === 'function') {
      $matches.each((index, node) => {
        const result = value($(node), $);
        if (typeof result === 'string') {
          convertNodeTo($(node), $, result);
        }
      });
    }
  });

  return $content;
}

function findMatchingSelector($, selectors, extractHtml, allowMultiple) {
  return selectors.find(selector => {
    if (Array.isArray(selector)) {
      if (extractHtml) {
        return selector.reduce((acc, s) => acc && $(s).length > 0, true);
      }

      const [s, attr] = selector;
      return (
        (allowMultiple || (!allowMultiple && $(s).length === 1)) &&
        $(s).attr(attr) &&
        $(s).attr(attr).trim() !== ''
      );
    }

    return (
      (allowMultiple || (!allowMultiple && $(selector).length === 1)) &&
      $(selector).text().trim() !== ''
    );
  });
}

function select(opts) {
  const { $, type, extractionOpts, extractHtml = false } = opts;
  if (!extractionOpts) return null;

  if (typeof extractionOpts === 'string') return extractionOpts;

  const { selectors, defaultCleaner = true, allowMultiple } = extractionOpts;

  const overrideAllowMultiple = type === 'lead_image_url' || allowMultiple;

  const matchingSelector = findMatchingSelector(
    $,
    selectors,
    extractHtml,
    overrideAllowMultiple
  );

  if (!matchingSelector) return null;

  function transformAndClean($node) {
    makeLinksAbsolute($node, $, opts.url || '');
    cleanBySelectors($node, $, extractionOpts);
    transformElements($node, $, extractionOpts);
    return $node;
  }

  function selectHtml() {
    let $content;

    if (Array.isArray(matchingSelector)) {
      $content = $(matchingSelector.join(','));
      const $wrapper = $('<div></div>');
      $content.each((_, element) => {
        $wrapper.append(element);
      });
      $content = $wrapper;
    } else {
      $content = $(matchingSelector);
    }

    $content.wrap($('<div></div>'));
    $content = $content.parent();
    $content = transformAndClean($content);
    if (Cleaners[type]) {
      Cleaners[type]($content, { ...opts, defaultCleaner });
    }

    if (allowMultiple) {
      return $content
        .children()
        .toArray()
        .map(el => $.html($(el)));
    }

    return $.html($content);
  }

  if (extractHtml) {
    return selectHtml(matchingSelector);
  }

  let $match;
  let result;
  if (Array.isArray(matchingSelector)) {
    const [selector, attr, transform] = matchingSelector;
    $match = $(selector);
    $match = transformAndClean($match);
    result = $match.map((_, el) => {
      const item = $(el).attr(attr).trim();
      return transform ? transform(item) : item;
    });
  } else {
    $match = $(matchingSelector);
    $match = transformAndClean($match);
    result = $match.map((_, el) => $(el).text().trim());
  }

  result =
    Array.isArray(result.toArray()) && allowMultiple
      ? result.toArray()
      : result[0];

  if (defaultCleaner && Cleaners[type]) {
    return Cleaners[type](result, { ...opts, ...extractionOpts });
  }

  return result;
}

function selectExtendedTypes(extend, opts) {
  const results = {};
  Reflect.ownKeys(extend).forEach(t => {
    if (!results[t]) {
      results[t] = select({ ...opts, type: t, extractionOpts: extend[t] });
    }
  });
  return results;
}

function extractResult(opts) {
  const { type, extractor, fallback = true } = opts;
  const result = select({ ...opts, extractionOpts: extractor[type] });

  if (result) return result;

  if (fallback) return GenericExtractor[type](opts);

  return null;
}

const RootExtractor = {
  extract(extractor = GenericExtractor, opts) {
    const { contentOnly, extractedTitle } = opts;

    if (extractor.domain === '*') return extractor.extract(opts);

    opts = { ...opts, extractor };

    if (contentOnly) {
      const content = extractResult({
        ...opts,
        type: 'content',
        extractHtml: true,
        title: extractedTitle,
      });
      return { content };
    }

    let extendedResults = {};
    if (extractor.extend) {
      extendedResults = selectExtendedTypes(extractor.extend, opts);
    }

    const title = extractResult({ ...opts, type: 'title' });
    const date_published = extractResult({ ...opts, type: 'date_published' });
    const author = extractResult({ ...opts, type: 'author' });
    const next_page_url = extractResult({ ...opts, type: 'next_page_url' });
    const content = extractResult({
      ...opts,
      type: 'content',
      extractHtml: true,
      title,
    });
    const lead_image_url = extractResult({
      ...opts,
      type: 'lead_image_url',
      content,
    });
    const excerpt = extractResult({ ...opts, type: 'excerpt', content });
    const dek = extractResult({ ...opts, type: 'dek', content, excerpt });
    const word_count = extractResult({ ...opts, type: 'word_count', content });
    const direction = extractResult({ ...opts, type: 'direction', title });
    const { url, domain } =
      extractResult({ ...opts, type: 'url_and_domain' }) || {
        url: null,
        domain: null,
      };

    return {
      title,
      content,
      author,
      date_published,
      lead_image_url,
      dek,
      next_page_url,
      url,
      domain,
      excerpt,
      word_count,
      direction,
      ...extendedResults,
    };
  },
};

module.exports = {
  select,
  selectExtendedTypes,
  cleanBySelectors,
  transformElements,
  RootExtractor,
};
