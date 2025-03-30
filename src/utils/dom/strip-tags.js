// strips all tags from a string of text
module.exports = function stripTags(text, $) {
  // Wrapping text in html element prevents errors when text
  // has no html
  const cleanText = $(`<span>${text}</span>`).text();
  return cleanText === '' ? text : cleanText;
}
