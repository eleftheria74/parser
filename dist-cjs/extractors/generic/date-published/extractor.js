const { cleanDatePublished } = require("../../../cleaners");
const { extractFromMeta, extractFromSelectors } = require("../../../resource/utils/dom");
const { extractFromUrl } = require("../../../utils/text");
const {
  DATE_PUBLISHED_META_TAGS,
  DATE_PUBLISHED_SELECTORS,
  DATE_PUBLISHED_URL_RES
} = require("./constants");
const GenericDatePublishedExtractor = {
  extract({ $, url, metaCache }) {
    let datePublished;
    datePublished = extractFromMeta(
      $,
      DATE_PUBLISHED_META_TAGS,
      metaCache,
      false
    );
    if (datePublished)
      return cleanDatePublished(datePublished);
    datePublished = extractFromSelectors($, DATE_PUBLISHED_SELECTORS);
    if (datePublished)
      return cleanDatePublished(datePublished);
    datePublished = extractFromUrl(url, DATE_PUBLISHED_URL_RES);
    if (datePublished)
      return cleanDatePublished(datePublished);
    return null;
  }
};
module.exports = GenericDatePublishedExtractor;
