const iconv = require("iconv-lite");
const { DEFAULT_ENCODING, ENCODING_RE } = require("./constants");
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
