const { EXTRANEOUS_LINK_HINTS_RE } = require('../constants');

module.exports = function scoreExtraneousLinks(href) {
  // If the URL itself contains extraneous values, give a penalty.
  if (EXTRANEOUS_LINK_HINTS_RE.test(href)) {
    return -25;
  }

  return 0;
}
