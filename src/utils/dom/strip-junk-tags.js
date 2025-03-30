const { STRIP_OUTPUT_TAGS, KEEP_CLASS } = require('./constants');

module.exports = function stripJunkTags(article, $, tags = []) {
  if (tags.length === 0) {
    tags = STRIP_OUTPUT_TAGS;
  }

  // Remove matching elements, but ignore
  // any element with a class of mercury-parser-keep
  $(tags.join(','), article)
    .not(`.${KEEP_CLASS}`)
    .remove();

  return $;
}
