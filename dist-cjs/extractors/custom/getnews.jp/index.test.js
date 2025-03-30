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
describe("GetnewsJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://getnews.jp/archives/2146078";
      const html = fs.readFileSync("./fixtures/getnews.jp.html");
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
      import_assert.default.equal(title, `\u6C17\u8EFD\u306B\u65B0\u805E\u3092\u30B9\u30AF\u30E9\u30C3\u30D7\u3067\u304D\u308B\u300C\u30DA\u30F3\u300D\u3001CUTPEN`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "https://getnews.jp/author/neol");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-04-21T02:51:39.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.neol.jp/wp-content/uploads/2019/04/1904212-620x411.png`
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
        "\u30CD\u30C3\u30C8\u793E\u4F1A\u306E\u73FE\u4EE3\u3067\u3082\u3001\u591A\u304F\u306E\u4EBA\u306B\u8AAD\u307E\u308C\u3066\u3044\u308B\u65B0\u805E\u3002\u305D\u3093\u306A\u65B0\u805E\u3092\u8AAD\u3093\u3067\u3044\u308B\u6642\u306B\u6C17\u306B\u306A\u3063\u305F\u8A18\u4E8B\u3092\u6C17\u8EFD\u306B\u30C7\u30FC\u30BF\u3068\u3057\u3066\u6B8B\u3057\u305F\u3044\u4EBA\u3082\u3044\u308B\u3060\u308D\u3046\u3002\u305D\u3093\u306A\u4E2D\u3001\u30B9\u30DE\u30FC\u30C8\u30D5\u30A9\u30F3\u3092\u6D3B\u7528\u3059\u308B\u3053\u3068\u306B\u3088\u3063\u3066\u3001\u7C21\u5358\u306B\u65B0\u805E\u8A18\u4E8B\u3092\u30B9\u30AF\u30E9\u30C3\u30D7\u5316\u3059\u308B\u3053\u3068\u304C\u53EF\u80FD\u3068\u306A\u3063\u305F\u3002"
      );
    });
  });
});
