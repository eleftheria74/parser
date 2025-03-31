const { stripTags } = require('../resource/utils/dom');
const { normalizeSpaces } = require('../utils/text');
const { TITLE_SPLITTERS_RE } = require('./constants');

// Απευθείας import χωρίς να αγγίζουμε το index.js (λύση circular dep)
const resolveSplitTitle = require('./resolve-split-title');

module.exports = function cleanTitle(title, { url, $ }) {
  if (TITLE_SPLITTERS_RE.test(title)) {
    title = resolveSplitTitle(title, url);
  }

  if (title.length > 150) {
    const h1 = $('h1');
    if (h1.length === 1) {
      title = h1.text();
    }
  }

  return normalizeSpaces(stripTags(title, $).trim());
};
