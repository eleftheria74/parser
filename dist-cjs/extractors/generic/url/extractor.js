const URL = require("url");
const { extractFromMeta } = require("../../../resource/utils/dom");
const { CANONICAL_META_SELECTORS } = require("./constants");
function parseDomain(url) {
  const parsedUrl = URL.parse(url);
  const { hostname } = parsedUrl;
  return hostname;
}
function result(url) {
  return {
    url,
    domain: parseDomain(url)
  };
}
const GenericUrlExtractor = {
  extract({ $, url, metaCache }) {
    const $canonical = $("link[rel=canonical]");
    if ($canonical.length !== 0) {
      const href = $canonical.attr("href");
      if (href) {
        return result(href);
      }
    }
    const metaUrl = extractFromMeta($, CANONICAL_META_SELECTORS, metaCache);
    if (metaUrl) {
      return result(metaUrl);
    }
    return result(url);
  }
};
module.exports = GenericUrlExtractor;
