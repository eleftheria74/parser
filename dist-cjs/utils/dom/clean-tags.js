const { getScore, scoreCommas } = require("../../extractors/generic/content/scoring");
const { CLEAN_CONDITIONALLY_TAGS, KEEP_CLASS } = require("./constants");
const { normalizeSpaces } = require("../text");
function getLinkDensity() {
  return require("./link-density").linkDensity;
}
function removeUnlessContent($node, $, weight) {
  if ($node.hasClass("entry-content-asset")) {
    return;
  }
  const content = normalizeSpaces($node.text());
  if (scoreCommas(content) < 10) {
    const pCount = $("p", $node).length;
    const inputCount = $("input", $node).length;
    if (inputCount > pCount / 3) {
      $node.remove();
      return;
    }
    const contentLength = content.length;
    const imgCount = $("img", $node).length;
    if (contentLength < 25 && imgCount === 0) {
      $node.remove();
      return;
    }
    const density = getLinkDensity()($node);
    if (weight < 25 && density > 0.2 && contentLength > 75) {
      $node.remove();
      return;
    }
    if (weight >= 25 && density > 0.5) {
      const tagName = $node.get(0).tagName.toLowerCase();
      const nodeIsList = tagName === "ol" || tagName === "ul";
      const prevText = $node.prev().text();
      const startsWithColon = prevText && prevText.trim().endsWith(":");
      if (!nodeIsList || !startsWithColon) {
        $node.remove();
        return;
      }
    }
  }
}
module.exports = function cleanTags($, $content) {
  $content.find(CLEAN_CONDITIONALLY_TAGS).each((_, node) => {
    const $node = $(node);
    if ($node.hasClass(KEEP_CLASS))
      return;
    const weight = getScore($node, $);
    removeUnlessContent($node, $, weight);
  });
};
