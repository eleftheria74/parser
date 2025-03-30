const { cleanAuthor } = require("cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const {
  AUTHOR_META_TAGS,
  AUTHOR_MAX_LENGTH,
  AUTHOR_SELECTORS,
  BYLINE_SELECTORS_RE
} = require("./constants");
const GenericAuthorExtractor = {
  extract({ $, metaCache }) {
    let author;
    author = extractFromMeta($, AUTHOR_META_TAGS, metaCache);
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }
    author = extractFromSelectors($, AUTHOR_SELECTORS, 2);
    if (author && author.length < AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }
    for (const [selector, regex] of BYLINE_SELECTORS_RE) {
      const node = $(selector);
      if (node.length === 1) {
        const text = node.text();
        if (regex.test(text)) {
          return cleanAuthor(text);
        }
      }
    }
    return null;
  }
};
module.exports = GenericAuthorExtractor;
