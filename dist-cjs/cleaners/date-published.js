var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var date_published_exports = {};
__export(date_published_exports, {
  cleanDateString: () => cleanDateString,
  createDate: () => createDate
});
module.exports = __toCommonJS(date_published_exports);
var import_constants = require("./constants");
const moment = require("moment-timezone");
const parseFormat = require("moment-parseformat");
function cleanDateString(dateString) {
  return (dateString.match(import_constants.SPLIT_DATE_STRING) || []).join(" ").replace(import_constants.TIME_MERIDIAN_DOTS_RE, "m").replace(import_constants.TIME_MERIDIAN_SPACE_RE, "$1 $2 $3").replace(import_constants.CLEAN_DATE_STRING_RE, "$1").trim();
}
function createDate(dateString, timezone, format) {
  if (import_constants.TIME_WITH_OFFSET_RE.test(dateString)) {
    return moment(new Date(dateString));
  }
  if (import_constants.TIME_AGO_STRING.test(dateString)) {
    const fragments = import_constants.TIME_AGO_STRING.exec(dateString);
    return moment().subtract(fragments[1], fragments[2]);
  }
  if (import_constants.TIME_NOW_STRING.test(dateString)) {
    return moment();
  }
  return timezone ? moment.tz(dateString, format || parseFormat(dateString), timezone) : moment(dateString, format || parseFormat(dateString));
}
module.exports = function cleanDatePublished(dateString, { timezone, format } = {}) {
  if (import_constants.MS_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10)).toISOString();
  }
  if (import_constants.SEC_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10) * 1e3).toISOString();
  }
  let date = createDate(dateString, timezone, format);
  if (!date.isValid()) {
    dateString = cleanDateString(dateString);
    date = createDate(dateString, timezone, format);
  }
  return date.isValid() ? date.toISOString() : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanDateString,
  createDate
});
