module.exports = function scoreCommas(text) {
  return (text.match(/,/g) || []).length;
};
