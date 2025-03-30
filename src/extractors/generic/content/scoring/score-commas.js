// return 1 for every comma in text
module.exports = function scoreCommas(text) {
  return (text.match(/,/g) || []).length;
}
