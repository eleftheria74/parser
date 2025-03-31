const { stripTags } = require("../resource/utils/dom");
const { normalizeSpaces } = require("../utils/text");
const { TITLE_SPLITTERS_RE } = require("./constants");
let resolveSplitTitle;
module.exports = function cleanTitle(title, { url, $ }) {
  if (TITLE_SPLITTERS_RE.test(title)) {
    if (!resolveSplitTitle) {
      resolveSplitTitle = require("./index").resolveSplitTitle;
    }
    title = resolveSplitTitle(title, url);
  }
  if (title.length > 150) {
    const h1 = $("h1");
    if (h1.length === 1) {
      title = h1.text();
    }
  }
  return normalizeSpaces(stripTags(title, $).trim());
};
