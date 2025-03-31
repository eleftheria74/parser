const { extractFromMeta } = require("../../../resource/utils/dom");
const { cleanImage } = require("../../../cleaners");
const {
  LEAD_IMAGE_URL_META_TAGS,
  LEAD_IMAGE_URL_SELECTORS
} = require("./constants");
const {
  scoreImageUrl,
  scoreAttr,
  scoreByParents,
  scoreBySibling,
  scoreByDimensions,
  scoreByPosition
} = require("./score-image");
const GenericLeadImageUrlExtractor = {
  extract({ $, content, metaCache, html }) {
    let cleanUrl;
    if (!$.browser && $("head").length === 0) {
      $("*").first().prepend(html);
    }
    const imageUrl = extractFromMeta(
      $,
      LEAD_IMAGE_URL_META_TAGS,
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
      let score = scoreImageUrl(src);
      score += scoreAttr($img);
      score += scoreByParents($img);
      score += scoreBySibling($img);
      score += scoreByDimensions($img);
      score += scoreByPosition(imgs, index);
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
    for (const selector of LEAD_IMAGE_URL_SELECTORS) {
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
