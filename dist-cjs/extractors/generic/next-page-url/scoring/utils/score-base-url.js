module.exports = function scoreBaseUrl(href, baseRegex) {
  if (!baseRegex.test(href)) {
    return -25;
  }
  return 0;
};
