const validUrl = require('valid-url');

module.exports = function clean(leadImageUrl) {
  leadImageUrl = leadImageUrl.trim();
  if (validUrl.isWebUri(leadImageUrl)) {
    return leadImageUrl;
  }

  return null;
}
