const { cleanTitle } = require("cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const {
  STRONG_TITLE_META_TAGS,
  WEAK_TITLE_META_TAGS,
  STRONG_TITLE_SELECTORS,
  WEAK_TITLE_SELECTORS
} = require("./constants");
const GenericTitleExtractor = {
  extract({ $, url, metaCache }) {
    let title;
    title = extractFromMeta($, STRONG_TITLE_META_TAGS, metaCache);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromSelectors($, STRONG_TITLE_SELECTORS);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromMeta($, WEAK_TITLE_META_TAGS, metaCache);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromSelectors($, WEAK_TITLE_SELECTORS);
    if (title)
      return cleanTitle(title, { url, $ });
    return "";
  }
};
module.exports = GenericTitleExtractor;
