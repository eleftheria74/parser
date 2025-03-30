const LEAD_IMAGE_URL_META_TAGS = [
  "og:image",
  "twitter:image",
  "image_src"
];
module.exports.LEAD_IMAGE_URL_META_TAGS = LEAD_IMAGE_URL_META_TAGS;
const LEAD_IMAGE_URL_SELECTORS = ["link[rel=image_src]"];
module.exports.LEAD_IMAGE_URL_SELECTORS = LEAD_IMAGE_URL_SELECTORS;
const POSITIVE_LEAD_IMAGE_URL_HINTS = [
  "upload",
  "wp-content",
  "large",
  "photo",
  "wp-image"
];
module.exports.POSITIVE_LEAD_IMAGE_URL_HINTS = POSITIVE_LEAD_IMAGE_URL_HINTS;
const POSITIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(
  POSITIVE_LEAD_IMAGE_URL_HINTS.join("|"),
  "i"
);
module.exports.POSITIVE_LEAD_IMAGE_URL_HINTS_RE = POSITIVE_LEAD_IMAGE_URL_HINTS_RE;
const NEGATIVE_LEAD_IMAGE_URL_HINTS = [
  "spacer",
  "sprite",
  "blank",
  "throbber",
  "gradient",
  "tile",
  "bg",
  "background",
  "icon",
  "social",
  "header",
  "hdr",
  "advert",
  "spinner",
  "loader",
  "loading",
  "default",
  "rating",
  "share",
  "facebook",
  "twitter",
  "theme",
  "promo",
  "ads",
  "wp-includes"
];
module.exports.NEGATIVE_LEAD_IMAGE_URL_HINTS = NEGATIVE_LEAD_IMAGE_URL_HINTS;
const NEGATIVE_LEAD_IMAGE_URL_HINTS_RE = new RegExp(
  NEGATIVE_LEAD_IMAGE_URL_HINTS.join("|"),
  "i"
);
module.exports.NEGATIVE_LEAD_IMAGE_URL_HINTS_RE = NEGATIVE_LEAD_IMAGE_URL_HINTS_RE;
const GIF_RE = /\.gif(\?.*)?$/i;
module.exports.GIF_RE = GIF_RE;
const JPG_RE = /\.jpe?g(\?.*)?$/i;
module.exports.JPG_RE = JPG_RE;
