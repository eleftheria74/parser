const { getWeight } = require("../../extractors/generic/content/scoring");
const { HEADER_TAG_LIST } = require("./constants");
const { normalizeSpaces } = require("../text");
module.exports = function cleanHeaders($article, $, title = "") {
  $(HEADER_TAG_LIST, $article).each((index, header) => {
    const $header = $(header);
    if ($($header, $article).prevAll("p").length === 0) {
      return $header.remove();
    }
    if (normalizeSpaces($(header).text()) === title) {
      return $header.remove();
    }
    if (getWeight($(header)) < 0) {
      return $header.remove();
    }
    return $header;
  });
  return $;
};
