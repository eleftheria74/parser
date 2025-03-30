const { scoreCommas, scoreLength } = require("./index");
module.exports = function scoreParagraph(node) {
  let score = 1;
  const text = node.text().trim();
  const textLength = text.length;
  if (textLength < 25) {
    return 0;
  }
  score += scoreCommas(text);
  score += scoreLength(textLength);
  if (text.slice(-1) === ":") {
    score -= 1;
  }
  return score;
};
