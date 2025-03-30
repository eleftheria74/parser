const { SPACER_RE } = require("./constants");
function cleanForHeight($img, $) {
  const height = parseInt($img.attr("height"), 10);
  const width = parseInt($img.attr("width"), 10) || 20;
  if ((height || 20) < 10 || width < 10) {
    $img.remove();
  } else if (height) {
    $img.removeAttr("height");
  }
  return $;
}
function removeSpacers($img, $) {
  if (SPACER_RE.test($img.attr("src"))) {
    $img.remove();
  }
  return $;
}
module.exports = function cleanImages($article, $) {
  $article.find("img").each((index, img) => {
    const $img = $(img);
    cleanForHeight($img, $);
    removeSpacers($img, $);
  });
  return $;
};
