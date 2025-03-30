var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_assert = __toESM(require("assert"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_date_published = __toESM(require("./date-published"));
describe("cleanDatePublished(dateString)", () => {
  it("returns a date", () => {
    const datePublished = (0, import_date_published.default)("published: 1/1/2020");
    import_assert.default.equal(datePublished, (0, import_moment_timezone.default)("1/1/2020", "MM/DD/YYYY").toISOString());
  });
  it("returns null if date is invalid", () => {
    const datePublished = (0, import_date_published.default)("blargh");
    import_assert.default.equal(datePublished, null);
  });
  it("handles timezones", () => {
    const datePublished = (0, import_date_published.default)("November 29, 2016: 8:18 AM ET", {
      timezone: "America/New_York"
    });
    import_assert.default.equal(datePublished, "2016-11-29T13:18:00.000Z");
  });
  it("accepts a custom date format", () => {
    const datePublished = (0, import_date_published.default)("Mon Aug 03 12:45:00 EDT 2015", {
      timezone: "America/New_York",
      format: "ddd MMM DD HH:mm:ss zz YYYY"
    });
    import_assert.default.equal(datePublished, "2015-08-03T16:45:00.000Z");
  });
  it('can handle dates formatted as "[just|right] now"', () => {
    const date1 = (0, import_date_published.default)("now");
    const newDate1 = (0, import_moment_timezone.default)(date1).format().split("T")[0];
    const expectedDate1 = (0, import_moment_timezone.default)().format().split("T")[0];
    import_assert.default.equal(newDate1, expectedDate1);
    const date2 = (0, import_date_published.default)("just now");
    const newDate2 = (0, import_moment_timezone.default)(date2).format().split("T")[0];
    const expectedDate2 = (0, import_moment_timezone.default)().format().split("T")[0];
    import_assert.default.equal(newDate2, expectedDate2);
    const date3 = (0, import_date_published.default)("right now");
    const newDate3 = (0, import_moment_timezone.default)(date3).format().split("T")[0];
    const expectedDate3 = (0, import_moment_timezone.default)().format().split("T")[0];
    import_assert.default.equal(newDate3, expectedDate3);
  });
  it('can handle dates formatted as "[amount] [time unit] ago"', () => {
    const date1 = (0, import_date_published.default)("1 hour ago");
    const newDate1 = (0, import_moment_timezone.default)(date1).format().split("T")[0];
    const expectedDate1 = (0, import_moment_timezone.default)().subtract(1, "hour").format().split("T")[0];
    import_assert.default.equal(newDate1, expectedDate1);
    const date2 = (0, import_date_published.default)("5 days ago");
    const newDate2 = (0, import_moment_timezone.default)(date2).format().split("T")[0];
    const expectedDate2 = (0, import_moment_timezone.default)().subtract(5, "days").format().split("T")[0];
    import_assert.default.equal(newDate2, expectedDate2);
    const date3 = (0, import_date_published.default)("10 months ago");
    const newDate3 = (0, import_moment_timezone.default)(date3).format().split("T")[0];
    const expectedDate3 = (0, import_moment_timezone.default)().subtract(10, "months").format().split("T")[0];
    import_assert.default.equal(newDate3, expectedDate3);
  });
});
describe("cleanDateString(dateString)", () => {
  it('removes "published" text from an datePublished string', () => {
    const datePublished = (0, import_date_published.cleanDateString)("published: 1/1/2020");
    import_assert.default.equal(datePublished, "1/1/2020");
  });
  it("trims whitespace", () => {
    const datePublished = (0, import_date_published.cleanDateString)("    1/1/2020     ");
    import_assert.default.equal(datePublished, "1/1/2020");
  });
  it("puts a space b/w a time and am/pm", () => {
    const date1 = (0, import_date_published.cleanDateString)("1/1/2020 8:30am");
    import_assert.default.equal(date1, "1/1/2020 8:30 am");
    const date2 = (0, import_date_published.cleanDateString)("8:30PM 1/1/2020");
    import_assert.default.equal(date2, "8:30 PM   1/1/2020");
  });
  it("cleans the dots from a.m. or p.m.", () => {
    const date1 = (0, import_date_published.cleanDateString)("1/1/2020 8:30 a.m.");
    import_assert.default.equal(date1, "1/1/2020 8:30 am");
  });
  it("can handle some tough timestamps", () => {
    const date1 = (0, import_date_published.cleanDateString)(
      "This page was last modified on 15 April 2016, at 10:59."
    );
    import_assert.default.equal(date1, "15 Apr 2016 10:59");
  });
  it("massages the T out", () => {
    const date1 = (0, import_date_published.cleanDateString)("2016-11-22T08:57-500");
    import_assert.default.equal(date1, "2016 11 22 08:57 -500");
  });
});
