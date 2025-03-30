const { brsToPs, convertNodeTo } = require('../../resource/utils/dom');

const { DIV_TO_P_BLOCK_TAGS } = require('./constants');

function convertDivs($) {
  $('div').each((index, div) => {
    const $div = $(div);
    const convertible = $div.children(DIV_TO_P_BLOCK_TAGS).length === 0;

    if (convertible) {
      convertNodeTo($div, $, 'p');
    }
  });

  return $;
}

function convertSpans($) {
  $('span').each((index, span) => {
    const $span = $(span);
    const convertible = $span.parents('p, div, li, figcaption').length === 0;
    if (convertible) {
      convertNodeTo($span, $, 'p');
    }
  });

  return $;
}

// Loop through the provided doc, and convert any p-like elements to
// actual paragraph tags.
//
//   Things fitting this criteria:
//   * Multiple consecutive <br /> tags.
//   * <div /> tags without block level elements inside of them
//   * <span /> tags who are not children of <p /> or <div /> tags.
//
//   :param $: A cheerio object to search
//   :return cheerio object with new p elements
//   (By-reference mutation, though. Returned just for convenience.)

module.exports = function convertToParagraphs($) {
  $ = brsToPs($);
  $ = convertDivs($);
  $ = convertSpans($);

  return $;
}
