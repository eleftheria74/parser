const CLEAN_AUTHOR_RE = /^\s*(posted |written )?by\s*:?\s*(.*)/i;
module.exports.CLEAN_AUTHOR_RE = CLEAN_AUTHOR_RE;
const TEXT_LINK_RE = new RegExp("http(s)?://", "i");
module.exports.TEXT_LINK_RE = TEXT_LINK_RE;
const DEK_META_TAGS = [];
module.exports.DEK_META_TAGS = DEK_META_TAGS;
const DEK_SELECTORS = [".entry-summary"];
module.exports.DEK_SELECTORS = DEK_SELECTORS;
const MS_DATE_STRING = /^\d{13}$/i;
module.exports.MS_DATE_STRING = MS_DATE_STRING;
const SEC_DATE_STRING = /^\d{10}$/i;
module.exports.SEC_DATE_STRING = SEC_DATE_STRING;
const CLEAN_DATE_STRING_RE = /^\s*published\s*:?\s*(.*)/i;
module.exports.CLEAN_DATE_STRING_RE = CLEAN_DATE_STRING_RE;
const TIME_MERIDIAN_SPACE_RE = /(.*\d)(am|pm)(.*)/i;
module.exports.TIME_MERIDIAN_SPACE_RE = TIME_MERIDIAN_SPACE_RE;
const TIME_MERIDIAN_DOTS_RE = /\.m\./i;
module.exports.TIME_MERIDIAN_DOTS_RE = TIME_MERIDIAN_DOTS_RE;
const TIME_NOW_STRING = /^\s*(just|right)?\s*now\s*/i;
module.exports.TIME_NOW_STRING = TIME_NOW_STRING;
const timeUnits = [
  "seconds?",
  "minutes?",
  "hours?",
  "days?",
  "weeks?",
  "months?",
  "years?"
];
const allTimeUnits = timeUnits.join("|");
const TIME_AGO_STRING = new RegExp(`(\\d+)\\s+(${allTimeUnits})\\s+ago`, "i");
module.exports.TIME_AGO_STRING = TIME_AGO_STRING;
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
const allMonths = months.join("|");
const timestamp1 = "[0-9]{1,2}:[0-9]{2,2}( ?[ap].?m.?)?";
const timestamp2 = "[0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4}";
const timestamp3 = "-[0-9]{3,4}$";
const SPLIT_DATE_STRING = new RegExp(
  `(${timestamp1})|(${timestamp2})|(${timestamp3})|([0-9]{1,4})|(${allMonths})`,
  "ig"
);
module.exports.SPLIT_DATE_STRING = SPLIT_DATE_STRING;
const TIME_WITH_OFFSET_RE = /-\d{3,4}$/;
module.exports.TIME_WITH_OFFSET_RE = TIME_WITH_OFFSET_RE;
const TITLE_SPLITTERS_RE = /(: | - | \| )/g;
module.exports.TITLE_SPLITTERS_RE = TITLE_SPLITTERS_RE;
const DOMAIN_ENDINGS_RE = new RegExp(".com$|.net$|.org$|.co.uk$", "g");
module.exports.DOMAIN_ENDINGS_RE = DOMAIN_ENDINGS_RE;
