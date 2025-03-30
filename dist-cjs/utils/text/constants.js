const PAGE_IN_HREF_RE = new RegExp(
  "(page|paging|(p(a|g|ag)?(e|enum|ewanted|ing|ination)))?(=|/)([0-9]{1,3})",
  "i"
);
const HAS_ALPHA_RE = /[a-z]/i;
const IS_ALPHA_RE = /^[a-z]+$/i;
const IS_DIGIT_RE = /^[0-9]+$/i;
const ENCODING_RE = /charset=([\w-]+)\b/;
const DEFAULT_ENCODING = "utf-8";
module.exports = {
  PAGE_IN_HREF_RE,
  HAS_ALPHA_RE,
  IS_ALPHA_RE,
  IS_DIGIT_RE,
  ENCODING_RE,
  DEFAULT_ENCODING
};
