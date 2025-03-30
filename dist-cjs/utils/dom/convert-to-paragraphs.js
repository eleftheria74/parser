const { brsToPs, convertNodeTo } = require("../../resource/utils/dom");
const { DIV_TO_P_BLOCK_TAGS } = require("./constants");
function convertDivs($) {
  $("div").each((index, div) => {
    const $div = $(div);
    const convertible = $div.children(DIV_TO_P_BLOCK_TAGS).length === 0;
    if (convertible) {
      convertNodeTo($div, $, "p");
    }
  });
  return $;
}
function convertSpans($) {
  $("span").each((index, span) => {
    const $span = $(span);
    const convertible = $span.parents("p, div, li, figcaption").length === 0;
    if (convertible) {
      convertNodeTo($span, $, "p");
    }
  });
  return $;
}
module.exports = function convertToParagraphs($) {
  $ = brsToPs($);
  $ = convertDivs($);
  $ = convertSpans($);
  return $;
};
