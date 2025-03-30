const { NEXT_LINK_TEXT_RE } = require('../constants');

module.exports = function scoreNextLinkText(linkData) {
  // Things like "next", ">>", etc.
  if (NEXT_LINK_TEXT_RE.test(linkData)) {
    return 50;
  }

  return 0;
}
