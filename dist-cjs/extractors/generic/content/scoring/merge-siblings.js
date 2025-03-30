const { textLength, linkDensity } = require("../../../../resource/utils/dom");
const { hasSentenceEnd } = require("../../../../resource/utils/text");
const { NON_TOP_CANDIDATE_TAGS_RE } = require("./constants");
const { getScore } = require("./index");
module.exports = function mergeSiblings($candidate, topScore, $) {
  if (!$candidate.parent().length) {
    return $candidate;
  }
  const siblingScoreThreshold = Math.max(10, topScore * 0.25);
  const wrappingDiv = $("<div></div>");
  $candidate.parent().children().each((index, sibling) => {
    const $sibling = $(sibling);
    if (NON_TOP_CANDIDATE_TAGS_RE.test(sibling.tagName)) {
      return null;
    }
    const siblingScore = getScore($sibling);
    if (siblingScore) {
      if ($sibling.get(0) === $candidate.get(0)) {
        wrappingDiv.append($sibling);
      } else {
        let contentBonus = 0;
        const density = linkDensity($sibling);
        if (density < 0.05) {
          contentBonus += 20;
        }
        if (density >= 0.5) {
          contentBonus -= 20;
        }
        if ($sibling.attr("class") === $candidate.attr("class")) {
          contentBonus += topScore * 0.2;
        }
        const newScore = siblingScore + contentBonus;
        if (newScore >= siblingScoreThreshold) {
          return wrappingDiv.append($sibling);
        }
        if (sibling.tagName === "p") {
          const siblingContent = $sibling.text();
          const siblingContentLength = textLength(siblingContent);
          if (siblingContentLength > 80 && density < 0.25) {
            return wrappingDiv.append($sibling);
          }
          if (siblingContentLength <= 80 && density === 0 && hasSentenceEnd(siblingContent)) {
            return wrappingDiv.append($sibling);
          }
        }
      }
    }
    return null;
  });
  if (wrappingDiv.children().length === 1 && wrappingDiv.children().first().get(0) === $candidate.get(0)) {
    return $candidate;
  }
  return wrappingDiv;
};
