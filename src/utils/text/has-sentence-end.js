// Given a string, return true if it appears to have an ending sentence
// within it, false otherwise.
const SENTENCE_END_RE = new RegExp('.( |$)');

function hasSentenceEnd(text) {
  return SENTENCE_END_RE.test(text);
}

module.exports = hasSentenceEnd;
