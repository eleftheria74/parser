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
const { excerptContent } = require("../../../resource/utils/text");
const fs = require("fs");
describe("ObamawhitehouseArchivesGovExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://obamawhitehouse.archives.gov/blog/2017/01/17/obama-administration-digital-transition-moving-forward";
      const html = fs.readFileSync(
        "./fixtures/obamawhitehouse.archives.gov.html"
      );
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
        "The Obama Administration Digital Transition: Moving Forward"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Kori Schulman");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2017-01-17T23:08:47.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek.split(/\s/).slice(0, 4).join(" "),
        "Summary: Here's the latest"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/digitaltransition.jpeg"
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
        "Over the past eight years, the President, the First Lady, and the Obama"
      );
    });
  });
  describe("wh.gov speeches", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://obamawhitehouse.archives.gov/the-press-office/2015/04/11/weekly-address-tuition-free-community-college";
      const html = fs.readFileSync(
        "./fixtures/obamawhitehouse.archives.gov--speeches.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("includes this youtube video", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      import_assert.default.equal($('iframe[src*="youtube"]').length, 1);
    });
  });
  describe("gets more failing blogs", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://obamawhitehouse.archives.gov/the-press-office/2016/12/24/weekly-address-merry-christmas-president-and-first-lady";
      const html = fs.readFileSync(
        "./fixtures/obamawhitehouse.archives.gov--blog.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("gets the words and video", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "In this week\u2019s address, the President and the First Lady wished all Americans"
      );
      import_assert.default.equal($('iframe[src*="youtube"]').length, 1);
    });
  });
  describe("handles this previously empty post", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://obamawhitehouse.archives.gov/blog/2011/09/10/serve-and-remember";
      const html = fs.readFileSync(
        "./fixtures/obamawhitehouse.archives.gov--empty.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("gets the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "September 11th has been designated as a National Day of Service and Remembrance."
      );
    });
  });
});
