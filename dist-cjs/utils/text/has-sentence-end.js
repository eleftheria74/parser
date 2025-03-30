const SENTENCE_END_RE = new RegExp(".( |$)");
function hasSentenceEnd(text) {
  return SENTENCE_END_RE.test(text);
}
module.exports = hasSentenceEnd;
