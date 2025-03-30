function textLength(text) {
  return text.trim().replace(/\s+/g, " ").length;
}
function linkDensity($node) {
  const totalTextLength = textLength($node.text());
  const linkText = $node.find("a").text();
  const linkLength = textLength(linkText);
  if (totalTextLength > 0) {
    return linkLength / totalTextLength;
  }
  if (totalTextLength === 0 && linkLength > 0) {
    return 1;
  }
  return 0;
}
module.exports = {
  textLength,
  linkDensity
};
