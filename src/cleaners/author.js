const { normalizeSpaces } = require('utils/text');
const { CLEAN_AUTHOR_RE } = require('./constants');

// Take an author string (like 'By David Smith ') and clean it to
// just the name(s): 'David Smith'.
module.exports = function cleanAuthor(author) {
  return normalizeSpaces(author.replace(CLEAN_AUTHOR_RE, '$2').trim());
}
