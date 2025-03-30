var import_constants = require("./constants");
const { scoreParagraph } = require("./index");
module.exports = function scoreNode($node) {
  const { tagName } = $node.get(0);
  if (import_constants.PARAGRAPH_SCORE_TAGS.test(tagName)) {
    return scoreParagraph($node);
  }
  if (tagName.toLowerCase() === "div") {
    return 5;
  }
  if (import_constants.CHILD_CONTENT_TAGS.test(tagName)) {
    return 3;
  }
  if (import_constants.BAD_TAGS.test(tagName)) {
    return -3;
  }
  if (tagName.toLowerCase() === "th") {
    return -5;
  }
  return 0;
};
