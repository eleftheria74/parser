const NORMALIZE_RE = /\s{2,}(?![^<>]*<\/(pre|code|textarea)>)/g;
function normalizeSpaces(text) {
  return text.replace(NORMALIZE_RE, " ").trim();
}
module.exports = normalizeSpaces;
