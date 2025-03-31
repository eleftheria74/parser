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
describe("BookwalkerJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://bookwalker.jp/de2b8f78c6-f6bb-4da9-8d15-202e8c6c185b/";
      const html = fs.readFileSync("./fixtures/bookwalker.jp.html");
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
      import_assert.default.equal(title, `\u7570\u4E16\u754C\u304A\u3082\u3044\u3067\u98DF\u5802 \uFF5E\u5049\u4EBA\u3068\u548C\u98DF\u306E\u3042\u3063\u305F\u304B\u30B4\u30CF\u30F3\uFF5E`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u8457\u8005 \u304A\u7C73\u30B4\u30CF\u30F3 \u30A4\u30E9\u30B9\u30C8 \u6C50\u8857\u30B3\u30CA");
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
      import_assert.default.equal(
        lead_image_url,
        `https://c.bookwalker.jp/7775823/t_700x780.jpg`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        9
      );
      import_assert.default.equal(
        first13,
        "\u8457\u8005 \u304A\u7C73\u30B4\u30CF\u30F3 \u30A4\u30E9\u30B9\u30C8 \u6C50\u8857\u30B3\u30CA \u5049\u4EBA\u306E\u201C\u304A\u3082\u3044\u3067\u201D\u304C\u7D21\u3050\u3001\u5FC3\u3042\u305F\u305F\u307E\u308B\u30B9\u30C8\u30FC\u30EA\u30FC\u3092\u53EC\u3057\u4E0A\u304C\u308C\uFF01 \u53E4\u4ECA\u6771\u897F\u306E\u5049\u4EBA\u305F\u3061\u304C\u8EE2\u751F\u3057\u3001\u66AE\u3089\u3057\u3066\u3044\u308B\u7570\u4E16\u754C\u2015\u2015\u3055\u304F\u3089\u5C0F\u753A\u3002\u305D\u306E\u4E00\u89D2\u306B\u300C\u304A\u3082\u3044\u3067\u98DF\u5802\u300D\u3068\u547C\u3070\u308C\u308B\u548C\u98DF\u5E97\u304C\u3042\u3063\u305F\u3002 \u677F\u524D\u306E\u5929\u5BAE\u52C7\u58EB\uFF08\u3042\u307E\u307F\u3084\u30FB\u3086\u3046\u3058\uFF09\u306F\u3001\u3053\u306E\u4E16\u754C\u306B\u8EE2\u751F\u3057\u3066\u304D\u305F\u3001\u5E73\u51E1\u306A\u9752\u5E74\u3002 \u305F\u3060\u306E\u6599\u7406\u597D\u304D\u3060\u3063\u305F\u5F7C\u306F\u3001\u30AA\u30FC\u30CA\u30FC\u3067\u3042\u308B\u300A\u52DD\u6D77\u821F\u300B\u3068\u306E\u5947\u5999\u306A\u7E01\u304B\u3089\u3053\u306E\u98DF\u5802\u3067\u50CD\u304F\u3053\u3068\u306B\u306A\u308A\u3001\u73FE\u4EE3\u3067\u306F\u306A\u308C\u306A\u304B\u3063\u305F\u6599\u7406\u4EBA\u3068\u3057\u3066\u306E\u4EBA\u751F\u3092\u8B33\u6B4C\u3059\u308B\u3002 \u5473\u306F\u3082\u3068\u3088\u308A\u3001\u6599\u7406\u3067\u5BA2\u306E\u201C\u304A\u3082\u3044\u3067\u201D\u3092\u523A\u6FC0\u3057\u3001\u61D0\u304B\u3057\u3055\u3092\u60F3\u8D77\u3055\u305B\u308B\u4E8B\u3082\u3042\u3063\u3066\u3001\u5E97\u306F\u5F90\u3005\u306B\u77E5\u3089\u308C\u3066\u3044\u304D\u3001\u4ECA\u3067\u306F\u3059\u3063\u304B\u308A\u3055\u304F\u3089\u5C0F\u753A\u306E\u96A0\u308C\u305F\u540D\u5E97\u3068\u306A\u3063\u3066\u3044\u305F\u3002"
      );
    });
  });
});
