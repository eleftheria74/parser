const { stripUnlikelyCandidates, convertToParagraphs } = require("../../../resource/utils/dom");
const { scoreContent, findTopCandidate } = require("./scoring");
module.exports = function extractBestNode($, opts) {
  if (opts.stripUnlikelyCandidates) {
    $ = stripUnlikelyCandidates($);
  }
  $ = convertToParagraphs($);
  $ = scoreContent($, opts.weightNodes);
  const $topCandidate = findTopCandidate($);
  return $topCandidate;
};
