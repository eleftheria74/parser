module.exports = function scorePageInLink(pageNum, isWp) {
  if (pageNum && !isWp) {
    return 50;
  }
  return 0;
};
