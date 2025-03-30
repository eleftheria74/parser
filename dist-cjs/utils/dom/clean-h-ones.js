const { convertNodeTo } = require("../../resource/utils/dom");
module.exports = function cleanHOnes(article, $) {
  const $hOnes = $("h1", article);
  if ($hOnes.length < 3) {
    $hOnes.each((index, node) => $(node).remove());
  } else {
    $hOnes.each((index, node) => {
      convertNodeTo($(node), $, "h2");
    });
  }
  return $;
};
