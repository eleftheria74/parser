const { EXTRANEOUS_LINK_HINTS_RE } = require("../constants");
module.exports = function scoreExtraneousLinks(href) {
  if (EXTRANEOUS_LINK_HINTS_RE.test(href)) {
    return -25;
  }
  return 0;
};
