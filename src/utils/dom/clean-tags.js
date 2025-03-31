const { getScore, setScore, getOrInitScore, scoreCommas } = require('../../extractors/generic/content/scoring');
const { CLEAN_CONDITIONALLY_TAGS, KEEP_CLASS } = require('./constants');
const { normalizeSpaces } = require('../text');

// Lazy load για αποφυγή circular require
function getLinkDensity() {
  return require('./link-density').linkDensity;
}

function removeUnlessContent($node, $, weight) {
  if ($node.hasClass('entry-content-asset')) {
    return;
  }

  const content = normalizeSpaces($node.text());

  if (scoreCommas(content) < 10) {
    const pCount = $('p', $node).length;
    const inputCount = $('input', $node).length;

    if (inputCount > pCount / 3) {
      $node.remove();
      return;
    }

    const contentLength = content.length;
    const imgCount = $('img', $node).length;

    if (contentLength < 25 && imgCount === 0) {
      $node.remove();
      return;
    }

    const density = getLinkDensity()($node);

    if (weight < 25 && density > 0.2 && contentLength > 75) {
      $node.remove();
      return;
    }

    if (weight >= 25 && density > 0.5) {
      const tagName = $node.get(0).tagName.toLowerCase();
      const nodeIsList = tagName === 'ol' || tagName === 'ul';
