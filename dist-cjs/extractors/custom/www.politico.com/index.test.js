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
var import_text = require("utils/text");
const fs = require("fs");
describe("PoliticoExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1";
      const html = fs.readFileSync("./fixtures/www.politico.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "Insiders: Trump will sink Pence in VP debate");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Steven Shepard");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      const new_date_published = (0, import_moment_timezone.default)(date_published).format().split("T")[0];
      import_assert.default.equal(new_date_published, "2016-10-04");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://static.politico.com/0f/e7/5ee9a89044d1a01f74140bcd5b9e/caucus-vp-preview.jpg"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Tim Kaine isn\u2019t Mike Pence\u2019s only opponent Tuesday night in the only debate"
      );
    });
  });
  describe("test case 2", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.politico.com/news/2022/10/17/student-debt-relief-applications-00062145";
      const html = fs.readFileSync(
        "./fixtures/www.politico.com--test-case-2.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(
        title,
        "Biden\u2019s student debt relief draws 8M+ applications in first two days"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Michael Stratford");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2022-10-17T20:01:26.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "The president urged Americans to apply for relief through \u2018easy, simple and fast\u2019 application process."
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://cf-images.us-east-1.prod.boltdns.net/v1/static/1155968404/79588bde-a378-49fd-b4b4-856d31662aca/35b02a16-1bc3-4d53-b660-4abadfbc14d8/1280x720/match/image.jpg"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "More than 8 million Americans have applied for federal student debt relief since"
      );
    });
  });
  describe("test case 3", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.politico.com/newsletters/morning-money/2022/10/11/grim-global-outlook-for-imf-world-bank-meetings-00061134";
      const html = fs.readFileSync(
        "./fixtures/www.politico.com--test-case-3.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "Grim global outlook for IMF-World Bank meetings");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Kate Davidson");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2022-10-11T12:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Fed rate hikes have caused spillover effects around the world, prompting a number of central banks to follow suit or intervene to prop up their currency in the face of a stronger U.S. dollar."
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://static.politico.com/da/f5/44342c424c68b675719324b1106b/politico.jpg"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Editor\u2019s note: Morning Money is a free version of POLITICO Pro Financial Services"
      );
    });
  });
});
