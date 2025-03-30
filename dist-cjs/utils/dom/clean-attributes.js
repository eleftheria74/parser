const { getAttrs, setAttrs } = require("../../resource/utils/dom");
const { WHITELIST_ATTRS_RE, KEEP_CLASS } = require("./constants");
function removeAllButWhitelist($article, $) {
  $article.find("*").each((index, node) => {
    const attrs = getAttrs(node);
    setAttrs(
      node,
      Reflect.ownKeys(attrs).reduce((acc, attr) => {
        if (WHITELIST_ATTRS_RE.test(attr)) {
          return { ...acc, [attr]: attrs[attr] };
        }
        return acc;
      }, {})
    );
  });
  $(`.${KEEP_CLASS}`, $article).removeClass(KEEP_CLASS);
  return $article;
}
module.exports = function cleanAttributes($article, $) {
  return removeAllButWhitelist(
    $article.parent().length ? $article.parent() : $article,
    $
  );
};
