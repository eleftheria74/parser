const getScore = require('./get-score').default;
const scoreNode = require('./score-node').default;
const getWeight = require('./get-weight').default;
const addToParent = require('./add-to-parent').default;

// gets and returns the score if it exists
// if not, initializes a score based on
// the node's tag type
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
}
