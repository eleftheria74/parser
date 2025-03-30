const DATE_PUBLISHED_META_TAGS = [
  "article:published_time",
  "displaydate",
  "dc.date",
  "dc.date.issued",
  "rbpubdate",
  "publish_date",
  "pub_date",
  "pagedate",
  "pubdate",
  "revision_date",
  "doc_date",
  "date_created",
  "content_create_date",
  "lastmodified",
  "created",
  "date"
];
module.exports.DATE_PUBLISHED_META_TAGS = DATE_PUBLISHED_META_TAGS;
const DATE_PUBLISHED_SELECTORS = [
  ".hentry .dtstamp.published",
  ".hentry .published",
  ".hentry .dtstamp.updated",
  ".hentry .updated",
  ".single .published",
  ".meta .published",
  ".meta .postDate",
  ".entry-date",
  ".byline .date",
  ".postmetadata .date",
  ".article_datetime",
  ".date-header",
  ".story-date",
  ".dateStamp",
  "#story .datetime",
  ".dateline",
  ".pubdate"
];
module.exports.DATE_PUBLISHED_SELECTORS = DATE_PUBLISHED_SELECTORS;
const abbrevMonthsStr = "(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)";
const DATE_PUBLISHED_URL_RES = [
  new RegExp("/(20\\d{2}/\\d{2}/\\d{2})/", "i"),
  new RegExp("(20\\d{2}-[01]\\d-[0-3]\\d)", "i"),
  new RegExp(`/(20\\d{2}/${abbrevMonthsStr}/[0-3]\\d)/`, "i")
];
module.exports.DATE_PUBLISHED_URL_RES = DATE_PUBLISHED_URL_RES;
