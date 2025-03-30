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
describe("WwwYomiuriCoJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.yomiuri.co.jp/sports/soccer/20190411-OYT1T50287/";
      const html = fs.readFileSync("./fixtures/www.yomiuri.co.jp.html");
      result = import_mercury.default.parse(url, {
        html,
        fallback: false
      });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, `\u30D0\u30EB\u30BB\u30ED\u30CA\u3001\u30DE\u30F3\uFF35\u306B\u5148\u52DD\u2026\uFF23\uFF2C\u6E96\u3005\u6C7A\u52DD\u7B2C\uFF11\u6226`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-04-11T13:22:00.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.yomiuri.co.jp/media/2019/04/20190411-OYT1I50076-1.jpg?type=ogp`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        1
      );
      import_assert.default.equal(
        first13,
        "\u5148\u5236\u70B9\u304C\u6C7A\u307E\u308A\u3001\u559C\u3076\u30D0\u30EB\u30BB\u30ED\u30CA\u306E\u30E1\u30C3\u30B7\uFF08\u5DE6\uFF09\u3068\u30B9\u30A2\u30EC\u30B9\uFF1D\u30ED\u30A4\u30BF\u30FC"
      );
    });
  });
});
