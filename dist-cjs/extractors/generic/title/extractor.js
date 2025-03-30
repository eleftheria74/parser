var import_constants = require("./constants");
const { cleanTitle } = require("cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const GenericTitleExtractor = {
  extract({ $, url, metaCache }) {
    let title;
    title = extractFromMeta($, import_constants.STRONG_TITLE_META_TAGS, metaCache);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromSelectors($, import_constants.STRONG_TITLE_SELECTORS);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromMeta($, import_constants.WEAK_TITLE_META_TAGS, metaCache);
    if (title)
      return cleanTitle(title, { url, $ });
    title = extractFromSelectors($, import_constants.WEAK_TITLE_SELECTORS);
    if (title)
      return cleanTitle(title, { url, $ });
    return "";
  }
};
module.exports = GenericTitleExtractor;
