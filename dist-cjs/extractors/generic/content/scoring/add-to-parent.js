const addScore = require("./add-score");
module.exports = function addToParent(node, $, score) {
  const parent = node.parent();
  if (parent) {
    addScore(parent, $, score * 0.25);
  }
  return node;
};
