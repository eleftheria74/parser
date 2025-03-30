const { NEXT_LINK_TEXT_RE, CAP_LINK_TEXT_RE } = require("../constants");
module.exports = function scoreCapLinks(linkData) {
  if (CAP_LINK_TEXT_RE.test(linkData)) {
    if (NEXT_LINK_TEXT_RE.test(linkData)) {
      return -65;
    }
  }
  return 0;
};
