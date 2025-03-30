const { convertNodeTo } = require("../../resource/utils/dom");
module.exports = function rewriteTopLevel(article, $) {
  $ = convertNodeTo($("html"), $, "div");
  $ = convertNodeTo($("body"), $, "div");
  return $;
};
