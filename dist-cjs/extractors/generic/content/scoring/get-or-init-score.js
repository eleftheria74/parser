const getScore = require("./get-score").default;
const scoreNode = require("./score-node").default;
const getWeight = require("./get-weight").default;
const addToParent = require("./add-to-parent").default;
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
