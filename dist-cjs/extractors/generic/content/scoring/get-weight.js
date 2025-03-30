const {
  NEGATIVE_SCORE_RE,
  POSITIVE_SCORE_RE,
  PHOTO_HINTS_RE,
  READABILITY_ASSET
} = require("./constants");
module.exports = function getWeight(node) {
  const classes = node.attr("class");
  const id = node.attr("id");
  let score = 0;
  if (id) {
    if (POSITIVE_SCORE_RE.test(id)) {
      score += 25;
    }
    if (NEGATIVE_SCORE_RE.test(id)) {
      score -= 25;
    }
  }
  if (classes) {
    if (score === 0) {
      if (POSITIVE_SCORE_RE.test(classes)) {
        score += 25;
      }
      if (NEGATIVE_SCORE_RE.test(classes)) {
        score -= 25;
      }
    }
    if (PHOTO_HINTS_RE.test(classes)) {
      score += 10;
    }
    if (READABILITY_ASSET.test(classes)) {
      score += 25;
    }
  }
  return score;
};
