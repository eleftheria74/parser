var import_constants = require("utils/dom/constants");
const { range } = require("utils");
const { EXTRANEOUS_LINK_HINTS_RE } = require("../constants");
function makeSig($link) {
  return `${$link.attr("class") || ""} ${$link.attr("id") || ""}`;
}
module.exports = function scoreByParents($link) {
  let $parent = $link.parent();
  let positiveMatch = false;
  let negativeMatch = false;
  let score = 0;
  Array.from(range(0, 4)).forEach(() => {
    if ($parent.length === 0) {
      return;
    }
    const parentData = makeSig($parent, " ");
    if (!positiveMatch && import_constants.PAGE_RE.test(parentData)) {
      positiveMatch = true;
      score += 25;
    }
    if (!negativeMatch && import_constants.NEGATIVE_SCORE_RE.test(parentData) && EXTRANEOUS_LINK_HINTS_RE.test(parentData)) {
      if (!import_constants.POSITIVE_SCORE_RE.test(parentData)) {
        negativeMatch = true;
        score -= 25;
      }
    }
    $parent = $parent.parent();
  });
  return score;
};
