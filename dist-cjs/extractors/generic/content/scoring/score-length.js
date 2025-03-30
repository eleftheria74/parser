const idkRe = new RegExp("^(p|pre)$", "i");
module.exports = function scoreLength(textLength, tagName = "p") {
  const chunks = textLength / 50;
  if (chunks > 0) {
    let lengthBonus;
    if (idkRe.test(tagName)) {
      lengthBonus = chunks - 2;
    } else {
      lengthBonus = chunks - 1.25;
    }
    return Math.min(Math.max(lengthBonus, 0), 3);
  }
  return 0;
};
