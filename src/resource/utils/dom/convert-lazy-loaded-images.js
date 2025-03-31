const { getAttrs } = require('../../../utils/dom/get-attrs'); // ✅ Απευθείας import, όχι index.js

const { IS_LINK, IS_IMAGE, IS_SRCSET } = require('./constants');

module.exports = function convertLazyLoadedImages($) {
  const extractSrcFromJSON = str => {
    try {
      const { src } = JSON.parse(str);
      if (typeof src === 'string') return src;
    } catch (_) {
      return false;
    }

    return false;
  };

  $('img').each((_, img) => {
    const attrs = getAttrs(img);

    Reflect.ownKeys(attrs).forEach(attr => {
      const value = attrs[attr];

      if (attr !== 'srcset' && IS_LINK.test(value) && IS_SRCSET.test(value)) {
        $(img).attr('srcset', value);
      } else if (
        attr !== 'src' &&
        attr !== 'srcset' &&
        IS_LINK.test(value) &&
        IS_IMAGE.test(value)
      ) {
        const existingSrc = extractSrcFromJSON(value);
        if (existingSrc) {
          $(img).attr('src', existingSrc);
        } else {
          $(img).attr('src', value);
        }
      }
    });
  });

  return $;
};
