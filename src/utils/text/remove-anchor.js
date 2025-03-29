function removeAnchor(url) {
  return url.replace(/#.*$/, '');
}

module.exports = removeAnchor;
