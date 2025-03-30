const { convertNodeTo } = require("../../../../resource/utils/dom");
const { HNEWS_CONTENT_SELECTORS } = require("./constants");
const { scoreNode, setScore, getOrInitScore, addScore } = require("./index");
function convertSpans($node, $) {
  if ($node.get(0)) {
    const { tagName } = $node.get(0);
    if (tagName === "span") {
      convertNodeTo($node, $, "div");
    }
  }
}
function addScoreTo($node, $, score) {
  if ($node) {
    convertSpans($node, $);
    addScore($node, $, score);
  }
}
function scorePs($, weightNodes) {
  $("p, pre").not("[score]").each((index, node) => {
    let $node = $(node);
    $node = setScore($node, $, getOrInitScore($node, $, weightNodes));
    const $parent = $node.parent();
    const rawScore = scoreNode($node);
    addScoreTo($parent, $, rawScore, weightNodes);
    if ($parent) {
      addScoreTo($parent.parent(), $, rawScore / 2, weightNodes);
    }
  });
  return $;
}
module.exports = function scoreContent($, weightNodes = true) {
  HNEWS_CONTENT_SELECTORS.forEach(([parentSelector, childSelector]) => {
    $(`${parentSelector} ${childSelector}`).each((index, node) => {
      addScore($(node).parent(parentSelector), $, 80);
    });
  });
  scorePs($, weightNodes);
  scorePs($, weightNodes);
  return $;
};
