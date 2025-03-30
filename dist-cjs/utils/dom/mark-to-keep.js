const URL = require("url");
const { KEEP_SELECTORS, KEEP_CLASS } = require("./constants");
module.exports = function markToKeep(article, $, url, tags = []) {
  if (tags.length === 0) {
    tags = KEEP_SELECTORS;
  }
  if (url) {
    const { protocol, hostname } = URL.parse(url);
    tags = [...tags, `iframe[src^="${protocol}//${hostname}"]`];
  }
  $(tags.join(","), article).addClass(KEEP_CLASS);
  return $;
};
