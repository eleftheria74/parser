const { PREV_LINK_TEXT_RE } = require("../constants");
module.exports = function scorePrevLink(linkData) {
  if (PREV_LINK_TEXT_RE.test(linkData)) {
    return -200;
  }
  return 0;
};
