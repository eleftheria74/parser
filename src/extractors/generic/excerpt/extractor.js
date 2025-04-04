const ellipsize = require('ellipsize');

const { extractFromMeta, stripTags, textLength, linkDensity } = require('../../../resource/utils/dom');
const { EXCERPT_META_SELECTORS } = require('./constants');

function clean(content, $, maxLength = 200) {
  content = content.replace(/[\s\n]+/g, ' ').trim();
  return ellipsize(content, maxLength, { ellipse: '&hellip;' });
}

const GenericExcerptExtractor = {
  extract({ $, content, metaCache }) {
    const excerpt = extractFromMeta($, EXCERPT_META_SELECTORS, metaCache);
    if (excerpt) {
      return clean(stripTags(excerpt, $));
    }
    // Fall back to excerpting from the extracted content
    const maxLength = 200;
    const shortContent = content.slice(0, maxLength * 5);
    return clean($(shortContent).text(), $, maxLength);
  },
};

module.exports = {
  GenericExcerptExtractor,
  linkDensity,
};
