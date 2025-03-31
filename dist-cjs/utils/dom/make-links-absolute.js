const URL = require("url");
function absolutize($, rootUrl, attr) {
  const { getAttrs, setAttr } = require("../../utils/dom/get-attrs");
  const baseUrl = $("base").attr("href");
  $(`[${attr}]`).each((_, node) => {
    const attrs = getAttrs(node);
    const url = attrs[attr];
    if (!url)
      return;
    const absoluteUrl = URL.resolve(baseUrl || rootUrl, url);
    setAttr(node, attr, absoluteUrl);
  });
}
function absolutizeSet($, rootUrl, $content) {
  const { getAttrs, setAttr } = require("../../utils/dom/get-attrs");
  $("[srcset]", $content).each((_, node) => {
    const attrs = getAttrs(node);
    const urlSet = attrs.srcset;
    if (urlSet) {
      const candidates = urlSet.match(
        /(?:\s*)(\S+(?:\s*[\d.]+[wx])?)(?:\s*,\s*)?/g
      );
      if (!candidates)
        return;
      const absoluteCandidates = candidates.map((candidate) => {
        const parts = candidate.trim().replace(/,$/, "").split(/\s+/);
        parts[0] = URL.resolve(rootUrl, parts[0]);
        return parts.join(" ");
      });
      const absoluteUrlSet = [...new Set(absoluteCandidates)].join(", ");
      setAttr(node, "srcset", absoluteUrlSet);
    }
  });
}
function makeLinksAbsolute($content, $, url) {
  ["href", "src"].forEach((attr) => absolutize($, url, attr));
  absolutizeSet($, url, $content);
  return $content;
}
module.exports = makeLinksAbsolute;
