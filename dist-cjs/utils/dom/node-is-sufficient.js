module.exports = function nodeIsSufficient($node) {
  return $node.text().trim().length >= 100;
};
