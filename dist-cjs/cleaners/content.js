const {
  cleanAttributes,
  cleanHeaders,
  cleanHOnes,
  cleanImages,
  cleanTags,
  removeEmpty,
  rewriteTopLevel,
  markToKeep,
  stripJunkTags,
  makeLinksAbsolute
} = require("../resource/utils/dom");
module.exports = function extractCleanNode(article, { $, cleanConditionally = true, title = "", url = "", defaultCleaner = true }) {
  rewriteTopLevel(article, $);
  if (defaultCleaner)
    cleanImages(article, $);
  makeLinksAbsolute(article, $, url);
  markToKeep(article, $, url);
  stripJunkTags(article, $);
  cleanHOnes(article, $);
  cleanHeaders(article, $, title);
  if (defaultCleaner)
    cleanTags(article, $, cleanConditionally);
  removeEmpty(article, $);
  cleanAttributes(article, $);
  return article;
};
