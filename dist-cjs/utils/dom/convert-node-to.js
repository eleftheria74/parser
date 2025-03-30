const { getAttrs } = require("../../resource/utils/dom");
module.exports = function convertNodeTo($node, $, tag = "p") {
  const node = $node.get(0);
  if (!node) {
    return $;
  }
  const attrs = getAttrs(node) || {};
  const attribString = Reflect.ownKeys(attrs).map((key) => `${key}=${attrs[key]}`).join(" ");
  let html;
  if ($.browser) {
    html = node.tagName.toLowerCase() === "noscript" ? $node.text() : $node.html();
  } else {
    html = $node.contents();
  }
  $node.replaceWith(`<${tag} ${attribString}>${html}</${tag}>`);
  return $;
};
