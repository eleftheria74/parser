var import_constants = require("./constants");
var import_score_image = require("./score-image");
const { extractFromMeta } = require("../../../resource/utils/dom");
const { cleanImage } = require("cleaners");
const GenericLeadImageUrlExtractor = {
  extract({ $, content, metaCache, html }) {
    let cleanUrl;
    if (!$.browser && $("head").length === 0) {
      $("*").first().prepend(html);
    }
    const imageUrl = extractFromMeta(
      $,
      import_constants.LEAD_IMAGE_URL_META_TAGS,
      metaCache,
      false
    );
    if (imageUrl) {
      cleanUrl = cleanImage(imageUrl);
      if (cleanUrl)
        return cleanUrl;
    }
    const $content = $(content);
    const imgs = $("img", $content).toArray();
    const imgScores = {};
    imgs.forEach((img, index) => {
      const $img = $(img);
      const src = $img.attr("src");
      if (!src)
        return;
      let score = (0, import_score_image.scoreImageUrl)(src);
      score += (0, import_score_image.scoreAttr)($img);
      score += (0, import_score_image.scoreByParents)($img);
      score += (0, import_score_image.scoreBySibling)($img);
      score += (0, import_score_image.scoreByDimensions)($img);
      score += (0, import_score_image.scoreByPosition)(imgs, index);
      imgScores[src] = score;
    });
    const [topUrl, topScore] = Reflect.ownKeys(imgScores).reduce(
      (acc, key) => imgScores[key] > acc[1] ? [key, imgScores[key]] : acc,
      [null, 0]
    );
    if (topScore > 0) {
      cleanUrl = cleanImage(topUrl);
      if (cleanUrl)
        return cleanUrl;
    }
    for (const selector of import_constants.LEAD_IMAGE_URL_SELECTORS) {
      const $node = $(selector).first();
      const src = $node.attr("src");
      if (src) {
        cleanUrl = cleanImage(src);
        if (cleanUrl)
          return cleanUrl;
      }
      const href = $node.attr("href");
      if (href) {
        cleanUrl = cleanImage(href);
        if (cleanUrl)
          return cleanUrl;
      }
      const value = $node.attr("value");
      if (value) {
        cleanUrl = cleanImage(value);
        if (cleanUrl)
          return cleanUrl;
      }
    }
    return null;
  }
};
module.exports = GenericLeadImageUrlExtractor;
