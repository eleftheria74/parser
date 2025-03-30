function extractFromUrl(url, regexList) {
  const matchRe = regexList.find((re) => re.test(url));
  if (matchRe) {
    return matchRe.exec(url)[1];
  }
  return null;
}
module.exports = extractFromUrl;
