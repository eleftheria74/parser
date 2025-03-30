const { NON_TOP_CANDIDATE_TAGS_RE } = require("./constants");
const { getScore } = require("./index");
const mergeSiblings = require("./merge-siblings");
module.exports = function findTopCandidate($) {
  let $candidate;
  let topScore = 0;
  $("[score]").each((index, node) => {
    if (NON_TOP_CANDIDATE_TAGS_RE.test(node.tagName)) {
      return;
    }
    const $node = $(node);
    const score = getScore($node);
    if (score > topScore) {
      topScore = score;
      $candidate = $node;
    }
  });
  if (!$candidate) {
    return $("body") || $("*").first();
  }
  $candidate = mergeSiblings($candidate, topScore, $);
  return $candidate;
};
