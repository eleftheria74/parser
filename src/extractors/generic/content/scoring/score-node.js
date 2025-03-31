const scoreParagraph = require('./score-paragraph').default;
const {
  PARAGRAPH_SCORE_TAGS,
  CHILD_CONTENT_TAGS,
  BAD_TAGS,
} = require('./constants');

// Score an individual node. Has some smarts for paragraphs, otherwise
// just scores based on tag.
module.exports = function scoreNode($node) {
  const { tagName } = $node.get(0);

  if (PARAGRAPH_SCORE_TAGS.test(tagName)) {
    return scoreParagraph($node);
  }
  if (tagName.toLowerCase() === 'div') {
    return 5;
  }
  if (CHILD_CONTENT_TAGS.test(tagName)) {
    return 3;
  }
  if (BAD_TAGS.test(tagName)) {
    return -3;
  }
  if (tagName.toLowerCase() === 'th') {
    return -5;
  }

  return 0;
};
