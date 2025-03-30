const { IS_DIGIT_RE } = require("../../../../../resource/utils/text/constants");
module.exports = function scoreLinkText(linkText, pageNum) {
  let score = 0;
  if (IS_DIGIT_RE.test(linkText.trim())) {
    const linkTextAsNum = parseInt(linkText, 10);
    if (linkTextAsNum < 2) {
      score = -30;
    } else {
      score = Math.max(0, 10 - linkTextAsNum);
    }
    if (pageNum && pageNum >= linkTextAsNum) {
      score -= 50;
    }
  }
  return score;
};
