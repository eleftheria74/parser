const { IS_WP_SELECTOR } = require("./constants");
module.exports = function isWordpress($) {
  return $(IS_WP_SELECTOR).length > 0;
};
