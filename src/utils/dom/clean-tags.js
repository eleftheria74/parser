const { getScore, setScore, getOrInitScore, scoreCommas } = require('../../extractors/generic/content/scoring');
const { CLEAN_CONDITIONALLY_TAGS, KEEP_CLASS } = require('./constants');
const { normalizeSpaces } = require('../text');
const { linkDensity } = require('./index');

function removeUnlessContent($node, $, weight) {
  // Explicitly save entry-content-asset tags, which are
  // noted as valuable in the Publisher guidelines. For now
  // this works everywhere. We may want to consider making
  // this less of a sure-thing later.
  if ($node.hasClass('entry-content-asset')) {
    return;
  }

  const content = normalizeSpaces($node.text());

  if (scoreCommas(content) < 10) {
    const pCount = $('p', $node).length;
    const inputCount = $('input', $node).length;

    // Looks like a form, too many inputs.
    if (inputCount > pCount / 3) {
      $node.remove();
      return;
    }

    const contentLength = content.length;
    const imgCount = $('img', $node).length;

    // Content is too short, and there are no images, so
    // this is probably junk content.
    if (contentLength < 25 && imgCount === 0) {
      $node.remove();
      return;
    }

    const density = linkDensity($node);

    // Too high of link density, is probably a menu or
    // something similar.
    if (weight < 25 && density > 0.2 && contentLength > 75) {
      $node.remove();
      return;
    }

    // Too high of a link density, despite the score being
    // high.
    if (weight >= 25 && density > 0.5) {
      // Don't remove the node if it's a list and the
      // previous sibling starts with a colon though. That
      // means it's probably content.
      const tagName = $node.get(0).tagName.toLowerCase();
      const nodeIsList = tagName === 'ol' || tagName === '
