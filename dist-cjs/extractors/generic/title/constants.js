const STRONG_TITLE_META_TAGS = [
  "tweetmeme-title",
  "dc.title",
  "rbtitle",
  "headline",
  "title"
];
module.exports.STRONG_TITLE_META_TAGS = STRONG_TITLE_META_TAGS;
const WEAK_TITLE_META_TAGS = ["og:title"];
module.exports.WEAK_TITLE_META_TAGS = WEAK_TITLE_META_TAGS;
const STRONG_TITLE_SELECTORS = [
  ".hentry .entry-title",
  "h1#articleHeader",
  "h1.articleHeader",
  "h1.article",
  ".instapaper_title",
  "#meebo-title"
];
module.exports.STRONG_TITLE_SELECTORS = STRONG_TITLE_SELECTORS;
const WEAK_TITLE_SELECTORS = [
  "article h1",
  "#entry-title",
  ".entry-title",
  "#entryTitle",
  "#entrytitle",
  ".entryTitle",
  ".entrytitle",
  "#articleTitle",
  ".articleTitle",
  "post post-title",
  "h1.title",
  "h2.article",
  "h1",
  "html head title",
  "title"
];
module.exports.WEAK_TITLE_SELECTORS = WEAK_TITLE_SELECTORS;
