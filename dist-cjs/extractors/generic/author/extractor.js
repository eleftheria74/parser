var import_constants = require("./constants");
const { cleanAuthor } = require("cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const GenericAuthorExtractor = {
  extract({ $, metaCache }) {
    let author;
    author = extractFromMeta($, import_constants.AUTHOR_META_TAGS, metaCache);
    if (author && author.length < import_constants.AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }
    author = extractFromSelectors($, import_constants.AUTHOR_SELECTORS, 2);
    if (author && author.length < import_constants.AUTHOR_MAX_LENGTH) {
      return cleanAuthor(author);
    }
    for (const [selector, regex] of import_constants.BYLINE_SELECTORS_RE) {
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
