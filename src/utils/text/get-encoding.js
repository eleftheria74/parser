const iconv = require('iconv-lite');
const { DEFAULT_ENCODING, ENCODING_RE } = require('./constants');

// Check a string for encoding; this is used in our fetchResource function
// to ensure correctly encoded responses
function getEncoding(str) {
  let encoding = DEFAULT_ENCODING;
  const matches = ENCODING_RE.exec(str);
  if (matches !== null) {
    [, str] = matches;
  }
  if (iconv.encodingExists(str)) {
    encoding = str;
  }
  return encoding;
}

module.exports = getEncoding;
