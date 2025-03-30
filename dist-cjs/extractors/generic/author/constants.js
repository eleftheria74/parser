const AUTHOR_META_TAGS = [
  "byl",
  "clmst",
  "dc.author",
  "dcsext.author",
  "dc.creator",
  "rbauthors",
  "authors"
];
module.exports.AUTHOR_META_TAGS = AUTHOR_META_TAGS;
const AUTHOR_MAX_LENGTH = 300;
module.exports.AUTHOR_MAX_LENGTH = AUTHOR_MAX_LENGTH;
const AUTHOR_SELECTORS = [
  ".entry .entry-author",
  ".author.vcard .fn",
  ".author .vcard .fn",
  ".byline.vcard .fn",
  ".byline .vcard .fn",
  ".byline .by .author",
  ".byline .by",
  ".byline .author",
  ".post-author.vcard",
  ".post-author .vcard",
  "a[rel=author]",
  "#by_author",
  ".by_author",
  "#entryAuthor",
  ".entryAuthor",
  ".byline a[href*=author]",
  "#author .authorname",
  ".author .authorname",
  "#author",
  ".author",
  ".articleauthor",
  ".ArticleAuthor",
  ".byline"
];
module.exports.AUTHOR_SELECTORS = AUTHOR_SELECTORS;
const bylineRe = /^[\n\s]*By/i;
const BYLINE_SELECTORS_RE = [
  ["#byline", bylineRe],
  [".byline", bylineRe]
];
module.exports.BYLINE_SELECTORS_RE = BYLINE_SELECTORS_RE;
