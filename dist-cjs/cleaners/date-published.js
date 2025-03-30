const moment = require("moment-timezone");
const parseFormat = require("moment-parseformat");
const {
  MS_DATE_STRING,
  SEC_DATE_STRING,
  CLEAN_DATE_STRING_RE,
  SPLIT_DATE_STRING,
  TIME_AGO_STRING,
  TIME_NOW_STRING,
  TIME_MERIDIAN_SPACE_RE,
  TIME_MERIDIAN_DOTS_RE,
  TIME_WITH_OFFSET_RE
} = require("./constants");
function cleanDateString(dateString) {
  return (dateString.match(SPLIT_DATE_STRING) || []).join(" ").replace(TIME_MERIDIAN_DOTS_RE, "m").replace(TIME_MERIDIAN_SPACE_RE, "$1 $2 $3").replace(CLEAN_DATE_STRING_RE, "$1").trim();
}
function createDate(dateString, timezone, format) {
  if (TIME_WITH_OFFSET_RE.test(dateString)) {
    return moment(new Date(dateString));
  }
  if (TIME_AGO_STRING.test(dateString)) {
    const fragments = TIME_AGO_STRING.exec(dateString);
    return moment().subtract(fragments[1], fragments[2]);
  }
  if (TIME_NOW_STRING.test(dateString)) {
    return moment();
  }
  return timezone ? moment.tz(dateString, format || parseFormat(dateString), timezone) : moment(dateString, format || parseFormat(dateString));
}
module.exports = function cleanDatePublished(dateString, { timezone, format } = {}) {
  if (MS_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10)).toISOString();
  }
  if (SEC_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10) * 1e3).toISOString();
  }
  let date = createDate(dateString, timezone, format);
  if (!date.isValid()) {
    dateString = cleanDateString(dateString);
    date = createDate(dateString, timezone, format);
  }
  return date.isValid() ? date.toISOString() : null;
};
