var import_dom = require("utils/dom");
module.exports = function extractCleanNode(article, { $, cleanConditionally = true, title = "", url = "", defaultCleaner = true }) {
  (0, import_dom.rewriteTopLevel)(article, $);
  if (defaultCleaner)
    (0, import_dom.cleanImages)(article, $);
  (0, import_dom.makeLinksAbsolute)(article, $, url);
  (0, import_dom.markToKeep)(article, $, url);
  (0, import_dom.stripJunkTags)(article, $);
  (0, import_dom.cleanHOnes)(article, $);
  (0, import_dom.cleanHeaders)(article, $, title);
  if (defaultCleaner)
    (0, import_dom.cleanTags)(article, $, cleanConditionally);
  (0, import_dom.removeEmpty)(article, $);
  (0, import_dom.cleanAttributes)(article, $);
  return article;
};
