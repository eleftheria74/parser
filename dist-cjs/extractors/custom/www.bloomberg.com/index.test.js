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
describe("WwwBloombergComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.bloomberg.com/politics/articles/2016-12-07/trump-hits-emblem-of-presidential-power-with-air-force-one-tweet";
      const html = fs.readFileSync("./fixtures/www.bloomberg.com.html");
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
        "Air Force One Costs Billions of Dollars Because It\u2019s a Flying White House"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Margaret Talev");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-12-07T10:00:00.011Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ioUAfA1V2nzk/v0/1200x675.jpg"
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
        "Donald Trump took aim at one of the most visible emblems of the"
      );
    });
  });
  describe("/graphics/ template", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.bloomberg.com/graphics/2016-apple-profits/";
      const html = fs.readFileSync(
        "./fixtures/www.bloomberg.com--graphics.html"
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
        "Americans Are Paying Apple Millions to Shelter Overseas Profits"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Andrea Wong");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-12-07T10:00:00.000Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://www.bloomberg.com/graphics/2016-apple-profits/img/2016-apple-profits-facebook.png"
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
        "Over the years, Apple Inc. has become the poster child for U.S. multinationals"
      );
    });
  });
  describe("/news/ template", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.bloomberg.com/news/articles/2016-12-06/stock-rally-extends-into-asia-as-traders-await-rbi-aussie-gdp";
      const html = fs.readFileSync("./fixtures/www.bloomberg.com--news.html");
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
        "U.S. Stocks Rise to Records, Bonds Gain on ECB Stimulus Optimism"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Jeremy Herron");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-12-06T23:22:22.402Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://assets.bwbx.io/javelin/public/images/social-markets-3d32d2f713.jpg"
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
        "The Dow Jones Industrial Average rose 220 points as U.S. stock indexes powered"
      );
    });
  });
});
