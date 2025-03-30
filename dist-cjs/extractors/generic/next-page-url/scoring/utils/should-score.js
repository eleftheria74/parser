const URL = require("url");
const { DIGIT_RE, EXTRANEOUS_LINK_HINTS_RE } = require("../constants");
module.exports = function shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls) {
  if (previousUrls.find((url) => href === url) !== void 0) {
    return false;
  }
  if (!href || href === articleUrl || href === baseUrl) {
    return false;
  }
  const { hostname } = parsedUrl;
  const { hostname: linkHost } = URL.parse(href);
  if (linkHost !== hostname) {
    return false;
  }
  const fragment = href.replace(baseUrl, "");
  if (!DIGIT_RE.test(fragment)) {
    return false;
  }
  if (EXTRANEOUS_LINK_HINTS_RE.test(linkText)) {
    return false;
  }
  if (linkText.length > 25) {
    return false;
  }
  return true;
};
