module.exports = function getScore($node) {
  return parseFloat($node.attr("score")) || null;
};
