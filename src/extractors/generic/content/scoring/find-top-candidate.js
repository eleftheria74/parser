const { NON_TOP_CANDIDATE_TAGS_RE } = require('./constants');
const { getScore } = require('./index');
const mergeSiblings = require('./merge-siblings');

// After we've calculated scores, loop through all of the possible
// candidate nodes we found and find the one with the highest score.
module.exports = function findTopCandidate($) {
  let $candidate;
  let topScore = 0;

  $('[score]').each((index, node) => {
    // Ignore tags like BR, HR, etc
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

  // If we don't have a candidate, return the body
  // or whatever the first element is
  if (!$candidate) {
    return $('body') || $('*').first();
  }

  $candidate = mergeSiblings($candidate, topScore, $);

  return $candidate;
}
