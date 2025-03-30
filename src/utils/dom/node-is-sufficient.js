// Given a node, determine if it's article-like enough to return
// param: node (a cheerio node)
// return: boolean

module.exports = function nodeIsSufficient($node) {
  return $node.text().trim().length >= 100;
}
