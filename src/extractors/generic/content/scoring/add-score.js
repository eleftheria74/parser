const { getOrInitScore, setScore } = require('./index');

module.exports = function addScore($node, $, amount) {
  try {
    const score = getOrInitScore($node, $) + amount;
    setScore($node, $, score);
  } catch (e) {
    // Ignoring; error occurs in scoreNode
  }

  return $node;
}
