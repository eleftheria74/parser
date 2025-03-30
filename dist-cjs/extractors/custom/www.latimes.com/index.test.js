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
var import_url = __toESM(require("url"));
var import_cheerio = __toESM(require("cheerio"));
var import_mercury = __toESM(require("mercury"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
const { excerptContent } = require("utils/text");
const fs = require("fs");
describe("WwwLatimesComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.latimes.com/local/education/la-me-edu-report-on-la-school-shutdown-20161216-story.html";
      const html = fs.readFileSync("./fixtures/www.latimes.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(
        title,
        "Report on L.A. school shutdown shows confusion over who was in charge, technology shortcomings"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Howard Blume");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      (0, import_assert.default)(date_published.startsWith("2016-12-1"));
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://ca-times.brightspotcdn.com/dims4/default/0c0a70c/2147483647/strip/true/crop/2048x1075+0+38/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff7%2F58%2Fa6329ffd4ef9fb4992750ddfbe32%2Fla-hblume-1481909376-snap-photo"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "An internal report on last year\u2019s unprecedented one-day shutdown of Los Angeles schools"
      );
    });
  });
});
