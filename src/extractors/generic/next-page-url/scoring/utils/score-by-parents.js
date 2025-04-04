const { range } = require('../../../../../resource/utils');
const {
  NEGATIVE_SCORE_RE,
  POSITIVE_SCORE_RE,
  PAGE_RE,
} = require('../../../../../resource/utils/dom/constants');
const { EXTRANEOUS_LINK_HINTS_RE } = require('../constants');

function makeSig($link) {
  return `${$link.attr('class') || ''} ${$link.attr('id') || ''}`;
}

module.exports = function scoreByParents($link) {
  // If a parent node contains paging-like classname or id, give a
  // bonus. Additionally, if a parent_node contains bad content
  // (like 'sponsor'), give a penalty.
  let $parent = $link.parent();
  let positiveMatch = false;
  let negativeMatch = false;
  let score = 0;

  Array.from(range(0, 4)).forEach(() => {
    if ($parent.length === 0) {
      return;
    }

    const parentData = makeSig($parent, ' ');

    // If we have 'page' or 'paging' in our data, that's a good
    // sign. Add a bonus.
    if (!positiveMatch && PAGE_RE.test(parentData)) {
      positiveMatch = true;
      score += 25;
    }

    // If we have 'comment' or something in our data, and
    // we don't have something like 'content' as well, that's
    // a bad sign. Give a penalty.
    if (
      !negativeMatch &&
      NEGATIVE_SCORE_RE.test(parentData) &&
      EXTRANEOUS_LINK_HINTS_RE.test(parentData)
    ) {
      if (!POSITIVE_SCORE_RE.test(parentData)) {
        negativeMatch = true;
        score -= 25;
      }
    }

    $parent = $parent.parent();
  });

  return score;
}
