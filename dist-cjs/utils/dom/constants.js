const SPACER_RE = new RegExp("transparent|spacer|blank", "i");
module.exports.SPACER_RE = SPACER_RE;
const KEEP_CLASS = "mercury-parser-keep";
module.exports.KEEP_CLASS = KEEP_CLASS;
const KEEP_SELECTORS = [
  'iframe[src^="https://www.youtube.com"]',
  'iframe[src^="https://www.youtube-nocookie.com"]',
  'iframe[src^="http://www.youtube.com"]',
  'iframe[src^="https://player.vimeo"]',
  'iframe[src^="http://player.vimeo"]',
  'iframe[src^="https://www.redditmedia.com"]'
];
module.exports.KEEP_SELECTORS = KEEP_SELECTORS;
const STRIP_OUTPUT_TAGS = [
  "title",
  "script",
  "noscript",
  "link",
  "style",
  "hr",
  "embed",
  "iframe",
  "object"
];
module.exports.STRIP_OUTPUT_TAGS = STRIP_OUTPUT_TAGS;
const REMOVE_ATTRS = ["style", "align"];
module.exports.REMOVE_ATTRS = REMOVE_ATTRS;
const REMOVE_ATTR_SELECTORS = REMOVE_ATTRS.map(
  (selector) => `[${selector}]`
);
module.exports.REMOVE_ATTR_SELECTORS = REMOVE_ATTR_SELECTORS;
const REMOVE_ATTR_LIST = REMOVE_ATTRS.join(",");
module.exports.REMOVE_ATTR_LIST = REMOVE_ATTR_LIST;
const WHITELIST_ATTRS = [
  "src",
  "srcset",
  "sizes",
  "type",
  "href",
  "class",
  "id",
  "alt",
  "xlink:href",
  "width",
  "height"
];
module.exports.WHITELIST_ATTRS = WHITELIST_ATTRS;
const WHITELIST_ATTRS_RE = new RegExp(
  `^(${WHITELIST_ATTRS.join("|")})$`,
  "i"
);
module.exports.WHITELIST_ATTRS_RE = WHITELIST_ATTRS_RE;
const REMOVE_EMPTY_TAGS = ["p"];
module.exports.REMOVE_EMPTY_TAGS = REMOVE_EMPTY_TAGS;
const REMOVE_EMPTY_SELECTORS = REMOVE_EMPTY_TAGS.map(
  (tag) => `${tag}:empty`
).join(",");
module.exports.REMOVE_EMPTY_SELECTORS = REMOVE_EMPTY_SELECTORS;
const CLEAN_CONDITIONALLY_TAGS = [
  "ul",
  "ol",
  "table",
  "div",
  "button",
  "form"
].join(",");
module.exports.CLEAN_CONDITIONALLY_TAGS = CLEAN_CONDITIONALLY_TAGS;
const HEADER_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const HEADER_TAG_LIST = HEADER_TAGS.join(",");
module.exports.HEADER_TAG_LIST = HEADER_TAG_LIST;
const BLOCK_LEVEL_TAGS = [
  "article",
  "aside",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "col",
  "colgroup",
  "dd",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "li",
  "map",
  "object",
  "ol",
  "output",
  "p",
  "pre",
  "progress",
  "section",
  "table",
  "tbody",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
  "video"
];
module.exports.BLOCK_LEVEL_TAGS = BLOCK_LEVEL_TAGS;
const BLOCK_LEVEL_TAGS_RE = new RegExp(
  `^(${BLOCK_LEVEL_TAGS.join("|")})$`,
  "i"
);
module.exports.BLOCK_LEVEL_TAGS_RE = BLOCK_LEVEL_TAGS_RE;
const selectorToAttribute = (selector) => `[${selector}]`;
module.exports.selectorToAttribute = selectorToAttribute;
