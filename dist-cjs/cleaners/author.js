const { normalizeSpaces } = require("../resource/utils/text");
const { CLEAN_AUTHOR_RE } = require("./constants");
module.exports = function cleanAuthor(author) {
  return normalizeSpaces(author.replace(CLEAN_AUTHOR_RE, "$2").trim());
};
