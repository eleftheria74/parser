const { PREV_LINK_TEXT_RE } = require('../constants');

module.exports = function scorePrevLink(linkData) {
  // If the link has something like "previous", its definitely
  // an old link, skip it.
  if (PREV_LINK_TEXT_RE.test(linkData)) {
    return -200;
  }

  return 0;
}
