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
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_mercury = __toESM(require("mercury"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
const { excerptContent } = require("utils/text");
const fs = require("fs");
describe("WwwChicagotribuneComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.chicagotribune.com/news/nationworld/politics/ct-trump-energy-department-climate-change-request-20161213-story.html";
      const html = fs.readFileSync("./fixtures/www.chicagotribune.com.html");
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
        "Energy Department rejects Trump's request to name climate change workers, who remain worried"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Joe Davidson");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      const new_date_published = (0, import_moment_timezone.default)(date_published).format().split("T")[0];
      import_assert.default.equal(new_date_published, "2016-12-13");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://www.chicagotribune.com/resizer/tP-TOTSSCwh-DB2Tl_zeREXAVqc=/1200x630/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/LNQKCWO2SFHNLEVJV7AIVSBPWA.jpg"
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
        `Global warming - "it's a hoax."Donald Trump has said that more than once.So`
      );
    });
  });
});
