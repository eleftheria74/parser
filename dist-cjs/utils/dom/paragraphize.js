const { BLOCK_LEVEL_TAGS_RE } = require("./constants");
module.exports = function paragraphize(node, $, br = false) {
  const $node = $(node);
  if (br) {
    let sibling = node.nextSibling;
    const p = $("<p></p>");
    while (sibling && !(sibling.tagName && BLOCK_LEVEL_TAGS_RE.test(sibling.tagName))) {
      const { nextSibling } = sibling;
      $(sibling).appendTo(p);
      sibling = nextSibling;
    }
    $node.replaceWith(p);
    $node.remove();
    return $;
  }
  return $;
};
