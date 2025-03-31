const getOrInitScore = require('./get-or-init-score').default;
const setScore = require('./set-score').default;

module.exports = function addScore($node, $, amount) {
  try {
    const score = getOrInitScore($node, $) + amount;
    setScore($node, $, score);
  } catch (e) {
    // Ignoring; error occurs in scoreNode
  }

  return $node;
}
