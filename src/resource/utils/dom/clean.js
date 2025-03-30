const { TAGS_TO_REMOVE } = require('./constants');

function isComment(index, node) {
  return node.type === 'comment';
}

function cleanComments($) {
  $.root()
    .find('*')
    .contents()
    .filter(isComment)
    .remove();

  return $;
}

module.exports = function clean($) {
  $(TAGS_TO_REMOVE).remove();

  $ = cleanComments($);
  return $;
}
