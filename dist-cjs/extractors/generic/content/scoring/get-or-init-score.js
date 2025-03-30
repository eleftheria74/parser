const { getScore, scoreNode, getWeight, addToParent } = require("./index");
module.exports = function getOrInitScore($node, $, weightNodes = true) {
  let score = getScore($node);
  if (score) {
    return score;
  }
  score = scoreNode($node);
  if (weightNodes) {
    score += getWeight($node);
  }
  addToParent($node, $, score);
  return score;
};
