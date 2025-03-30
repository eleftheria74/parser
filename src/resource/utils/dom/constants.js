const IS_LINK = new RegExp('https?://', 'i');
module.exports.IS_LINK = IS_LINK;
const IMAGE_RE = '.(png|gif|jpe?g)';
const IS_IMAGE = new RegExp(`${IMAGE_RE}`, 'i');
module.exports.IS_IMAGE = IS_IMAGE;
const IS_SRCSET = new RegExp(
  `${IMAGE_RE}(\\?\\S+)?(\\s*[\\d.]+[wx])`,
  'i'
);
module.exports.IS_SRCSET = IS_SRCSET;

const TAGS_TO_REMOVE = ['script', 'style', 'form'].join(',');
module.exports.TAGS_TO_REMOVE = TAGS_TO_REMOVE;
