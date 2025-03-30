const { withinComment } = require("../../resource/utils/dom");
function isGoodNode($node, maxChildren) {
  if ($node.children().length > maxChildren) {
    return false;
  }
  if (withinComment($node)) {
    return false;
  }
  return true;
}
module.exports = function extractFromSelectors($, selectors, maxChildren = 1, textOnly = true) {
  for (const selector of selectors) {
    const nodes = $(selector);
    if (nodes.length === 1) {
      const $node = $(nodes[0]);
      if (isGoodNode($node, maxChildren)) {
        let content;
        if (textOnly) {
          content = $node.text();
        } else {
          content = $node.html();
        }
        if (content) {
          return content;
        }
      }
    }
  }
  return null;
};
