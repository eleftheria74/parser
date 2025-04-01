const cheerio = require('cheerio')
const TurndownService = require('turndown');

const Resource = require('./resource/index.js');
const { validateUrl } = require('./utils');
const addCustomExtractor = require('./extractors/add-extractor');
const getExtractor = require('./extractors/get-extractor');
const RootExtractor = require('./extractors/root-extractor');
const { selectExtendedTypes } = require('./extractors/root-extractor');
const collectAllPages = require('./extractors/collect-all-pages');

const Parser = {
  async parse(url, { html, ...opts } = {}) {
    const {
      fetchAllPages = true,
      fallback = true,
      contentType = 'html',
      headers = {},
      extend,
      customExtractor,
    } = opts;

    if (!url && cheerio.browser) {
      url = window.location.href; // eslint-disable-line no-undef
      html = html || cheerio.html();
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return {
        error: true,
        message:
          'The url parameter passed does not look like a valid URL. Please check your URL and try again.',
      };
    }

    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    const $ = await Resource.create(url, html, parsedUrl, { ...defaultHeaders, ...headers });

    if ($.failed) {
      return $;
    }

    if (customExtractor) {
      addCustomExtractor(customExtractor);
    }

    const Extractor = getExtractor(url, parsedUrl, $);

    if (!html) {
      html = $.html();
    }

    const metaCache = $('meta')
      .map((_, node) => $(node).attr('name'))
      .toArray();

    let extendedTypes = {};
    if (extend) {
      extendedTypes = selectExtendedTypes(extend, { $, url, html });
    }

    let result = RootExtractor.extract(Extractor, {
      url,
      html,
      $,
      metaCache,
      parsedUrl,
      fallback,
      contentType,
    });

    const { title, next_page_url } = result;

    if (fetchAllPages && next_page_url) {
      result = await collectAllPages({
        Extractor,
        next_page_url,
        html,
        $,
        metaCache,
        result,
        title,
        url,
      });
    } else {
      result = {
        ...result,
        total_pages: 1,
        rendered_pages: 1,
      };
    }

    if (contentType === 'markdown') {
      const turndownService = new TurndownService();
      result.content = turndownService.turndown(result.content);
    } else if (contentType === 'text') {
      result.content = $.text($(result.content));
    }

    return { ...result, ...extendedTypes };
  },

  browser: !!cheerio.browser,

  fetchResource(url) {
    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    };
    return Resource.create(url, null, new URL(url), defaultHeaders);
  },

  addExtractor(extractor) {
    return addCustomExtractor(extractor);
  },
};

module.exports = Parser;
