const { CANDIDATES_WHITELIST, CANDIDATES_BLACKLIST } = require("./constants");
module.exports = function stripUnlikelyCandidates($) {
  $("*").not("a").each((index, node) => {
    const $node = $(node);
    const classes = $node.attr("class");
    const id = $node.attr("id");
    if (!id && !classes)
      return;
    const classAndId = `${classes || ""} ${id || ""}`;
    if (CANDIDATES_WHITELIST.test(classAndId)) {
      return;
    }
    if (CANDIDATES_BLACKLIST.test(classAndId)) {
      $node.remove();
    }
  });
  return $;
};
