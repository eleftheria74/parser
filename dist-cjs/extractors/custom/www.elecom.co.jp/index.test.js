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
describe("WwwElecomCoJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.elecom.co.jp/news/201903/keyboard/index.html";
      const html = fs.readFileSync("./fixtures/www.elecom.co.jp.html");
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
      import_assert.default.equal(
        title,
        `[News] \u30B5\u30AF\u30B5\u30AF\u8EFD\u3044\u6253\u3061\u5FC3\u5730\u3092\u5B9F\u73FE\u3057\u3001\u30AD\u30FC\u5165\u529B\u304C\u306F\u304B\u3069\u308B\uFF01\u30AD\u30FC\u8377\u91CD\u304C\u5F93\u6765\u6BD4\u7D0418%\u3082\u8EFD\u304F\u306A\u3063\u305F\u8584\u578B\u30AD\u30FC\u30DC\u30FC\u30C9\u3001\u63A5\u7D9A\u30BF\u30A4\u30D7/\u30B5\u30A4\u30BA/\u30DE\u30A6\u30B9\u4ED8\u304D\u306A\u3069\u3067\u9078\u3079\u308B6\u30E2\u30C7\u30EB\u3092\u767A\u58F2`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-03-04T15:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(lead_image_url, null);
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        3
      );
      import_assert.default.equal(
        first13,
        "EL34-194 2019.03.05 \u30B5\u30AF\u30B5\u30AF\u8EFD\u3044\u6253\u3061\u5FC3\u5730\u3092\u5B9F\u73FE\u3057\u3001\u30AD\u30FC\u5165\u529B\u304C\u306F\u304B\u3069\u308B\uFF01"
      );
    });
  });
});
