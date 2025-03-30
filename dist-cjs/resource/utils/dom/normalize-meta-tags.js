function convertMetaProp($, from, to) {
  $(`meta[${from}]`).each((_, node) => {
    const $node = $(node);
    const value = $node.attr(from);
    $node.attr(to, value);
    $node.removeAttr(from);
  });
  return $;
}
module.exports = function normalizeMetaTags($) {
  $ = convertMetaProp($, "content", "value");
  $ = convertMetaProp($, "property", "name");
  return $;
};
