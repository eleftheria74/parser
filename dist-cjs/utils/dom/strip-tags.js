module.exports = function stripTags(text, $) {
  const cleanText = $(`<span>${text}</span>`).text();
  return cleanText === "" ? text : cleanText;
};
