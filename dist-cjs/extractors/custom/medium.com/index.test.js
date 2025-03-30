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
describe("MediumExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://medium.com/the-wtf-economy/wtf-whats-the-future-e52ab9515573#.ilwrgwsks";
      const html = fs.readFileSync("./fixtures/medium.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "WTF? What\u2019s The Future?");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Tim O'Reilly");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-10-19T14:30:56.529Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://miro.medium.com/max/540/1*3Gzaug9mRc8vvx1cuQWkog.png"
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
        "Last Thursday, I had the honor to be one of the warmup acts"
      );
    });
  });
  describe("works with another url", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://medium.com/@JakobUlbrich/flag-attributes-in-android-how-to-use-them-ac4ec8aee7d1#.h949wjmyw";
      const html = fs.readFileSync("./fixtures/medium.com--another.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent($.text(), 13);
      import_assert.default.equal(
        first13,
        "I\u2019m sure you have seen something like the following line very often while"
      );
    });
  });
});
