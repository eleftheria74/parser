const difflib = require("difflib");
module.exports = function scoreSimilarity(score, articleUrl, href) {
  if (score > 0) {
    const similarity = new difflib.SequenceMatcher(
      null,
      articleUrl,
      href
    ).ratio();
    const diffPercent = 1 - similarity;
    const diffModifier = -(250 * (diffPercent - 0.2));
    return score + diffModifier;
  }
  return 0;
};
