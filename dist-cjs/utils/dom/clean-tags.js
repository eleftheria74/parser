const {
  getScore,
  setScore,
  getOrInitScore,
  scoreCommas
} = require("extractors/generic/content/scoring");
const { CLEAN_CONDITIONALLY_TAGS, KEEP_CLASS } = require("./constants");
const { normalizeSpaces } = require("../text");
const { linkDensity } = require("./index");
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
    const density = linkDensity($node);
    if (weight < 25 && density > 0.2 && contentLength > 75) {
      $node.remove();
      return;
    }
    if (weight >= 25 && density > 0.5) {
      const tagName = $node.get(0).tagName.toLowerCase();
      const nodeIsList = tagName === "ol" || tagName === "ul";
      if (nodeIsList) {
        const previousNode = $node.prev();
        if (previousNode && normalizeSpaces(previousNode.text()).slice(-1) === ":") {
          return;
        }
      }
      $node.remove();
      return;
    }
    const scriptCount = $("script", $node).length;
    if (scriptCount > 0 && contentLength < 150) {
      $node.remove();
    }
  }
}
module.exports = function cleanTags($article, $) {
  $(CLEAN_CONDITIONALLY_TAGS, $article).each((index, node) => {
    const $node = $(node);
    if ($node.hasClass(KEEP_CLASS) || $node.find(`.${KEEP_CLASS}`).length > 0)
      return;
    let weight = getScore($node);
    if (!weight) {
      weight = getOrInitScore($node, $);
      setScore($node, $, weight);
    }
    if (weight < 0) {
      $node.remove();
    } else {
      removeUnlessContent($node, $, weight);
    }
  });
  return $;
};
