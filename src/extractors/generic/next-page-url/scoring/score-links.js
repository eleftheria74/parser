const { textLength, linkDensity } = require('../../../../../utils/dom/link-density');

function scoreLinkText($node) {
  const linkText = $node.text();
  const length = textLength(linkText);
  if (length < 15) return 0;
  if (length > 65) return 0;
  return 1;
}

function getWeight($node) {
  const weight = Number($node.attr('data-weight'));
  return !Number.isNaN(weight) ? weight : 0;
}

function getScore($node) {
  const text = $node.text();
  const length = textLength(text);
  const density = linkDensity($node);
  let score = 0;

  if (length >= 25 && length <= 75) score += 10;
  if (density < 0.2) score += 5;

  return score;
}

module.exports = {
  scoreLinkText,
  getWeight,
  getScore,
  textLength,
  linkDensity
};

