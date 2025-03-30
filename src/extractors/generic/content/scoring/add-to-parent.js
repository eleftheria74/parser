const { addScore } = require('./index');

// Adds 1/4 of a child's score to its parent
module.exports = function addToParent(node, $, score) {
  const parent = node.parent();
  if (parent) {
    addScore(parent, $, score * 0.25);
  }

  return node;
}
