var import_constants = require("./constants");
const { cleanDatePublished } = require("cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const { extractFromUrl } = require("../../../resource/utils/text");
const GenericDatePublishedExtractor = {
  extract({ $, url, metaCache }) {
    let datePublished;
    datePublished = extractFromMeta(
      $,
      import_constants.DATE_PUBLISHED_META_TAGS,
      metaCache,
      false
    );
    if (datePublished)
      return cleanDatePublished(datePublished);
    datePublished = extractFromSelectors($, import_constants.DATE_PUBLISHED_SELECTORS);
    if (datePublished)
      return cleanDatePublished(datePublished);
    datePublished = extractFromUrl(url, import_constants.DATE_PUBLISHED_URL_RES);
    if (datePublished)
      return cleanDatePublished(datePublished);
    return null;
  }
};
module.exports = GenericDatePublishedExtractor;
