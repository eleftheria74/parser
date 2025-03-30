module.exports = function setScore($node, $, score) {
  $node.attr('score', score);
  return $node;
}
