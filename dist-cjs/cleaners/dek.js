const { stripTags } = require("../resource/utils/dom");
const { excerptContent, normalizeSpaces } = require("../utils/text");
const { TEXT_LINK_RE } = require("./constants");
module.exports = function cleanDek(dek, { $, excerpt }) {
  if (dek.length > 1e3 || dek.length < 5)
    return null;
  if (excerpt && excerptContent(excerpt, 10) === excerptContent(dek, 10))
    return null;
  const dekText = stripTags(dek, $);
  if (TEXT_LINK_RE.test(dekText))
    return null;
  return normalizeSpaces(dekText.trim());
};
