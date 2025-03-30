var import_constants = require("./constants");
module.exports = function getWeight(node) {
  const classes = node.attr("class");
  const id = node.attr("id");
  let score = 0;
  if (id) {
    if (import_constants.POSITIVE_SCORE_RE.test(id)) {
      score += 25;
    }
    if (import_constants.NEGATIVE_SCORE_RE.test(id)) {
      score -= 25;
    }
  }
  if (classes) {
    if (score === 0) {
      if (import_constants.POSITIVE_SCORE_RE.test(classes)) {
        score += 25;
      }
      if (import_constants.NEGATIVE_SCORE_RE.test(classes)) {
        score -= 25;
      }
    }
    if (import_constants.PHOTO_HINTS_RE.test(classes)) {
      score += 10;
    }
    if (import_constants.READABILITY_ASSET.test(classes)) {
      score += 25;
    }
  }
  return score;
};
