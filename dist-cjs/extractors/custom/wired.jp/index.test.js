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
var import_text = require("utils/text");
const fs = require("fs");
describe("WiredJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://wired.jp/2019/04/25/helvetica-now/";
      const html = fs.readFileSync("./fixtures/wired.jp.html");
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
        `\u3042\u306E\u6709\u540D\u30D5\u30A9\u30F3\u30C8\u300CHelvetica\u300D\u306F\u3001\u3053\u3046\u3057\u3066\u30C7\u30B8\u30BF\u30EB\u6642\u4EE3\u306B\u751F\u307E\u308C\u5909\u308F\u3063\u305F`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Arielle Pardes");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-04-25T07:00:25.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "\u4E16\u754C\u3067\u6700\u3082\u591A\u304F\u4F7F\u308F\u308C\u3066\u3044\u308B\u3067\u3042\u308D\u3046\u30D5\u30A9\u30F3\u30C8\u306E\u3072\u3068\u3064\u300CHelvetica\u300D\u304C\u3001\u3053\u306E\u307B\u3069\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\u3092\u9042\u3052\u305F\u3002\u307E\u308B\u3067\u6C34\u306E\u3088\u3046\u306B\u751F\u6D3B\u306B\u6D78\u900F\u3057\u3066\u3044\u308B\u30D5\u30A9\u30F3\u30C8\u306E\u30C7\u30B6\u30A4\u30F3\u306F\u3001\u3044\u304B\u306B\u4F1D\u7D71\u3092\u5B88\u308A\u306A\u304C\u3089\u3001\u30C7\u30B8\u30BF\u30EB\u6642\u4EE3\u306B\u5408\u308F\u305B\u3066\u6700\u9069\u5316\u3055\u308C\u305F\u306E\u304B\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://media.wired.jp/photos/61ce7c3feca9c13f76376390/16:9/w_1280,c_limit/5d08c7d457813df29e12d93c9b6f869f.jpg`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        1
      );
      import_assert.default.equal(
        first13,
        "\u300CHelvetica\u300D\u306F\u3001\u304A\u305D\u3089\u304F\u4E16\u754C\u3067\u6700\u3082\u3088\u304F\u4F7F\u308F\u308C\u3066\u3044\u308B\u30D5\u30A9\u30F3\u30C8\u3060\u308D\u3046\u30021957\u5E74\u306B\u8A95\u751F\u3057\u305F\u3053\u306E\u66F8\u4F53\u3092\u7D39\u4ECB\u3059\u308B\u52D5\u753B\u306F\u3001\u300CHelvetica\u306F\u6C34\u306E\u3088\u3046\u3060\u300D\u3068\u3044\u3046\u30CA\u30EC\u30FC\u30B7\u30E7\u30F3\u3067\u59CB\u307E\u308B\u3002\u30B5\u30F3\u30BB\u30EA\u30D5\u306E\u7C21\u7D20\u306A\u5B57\u5F62\u306B\u306F\u300C\u30E6\u30D3\u30AD\u30BF\u30B9\u300D\u3068\u3044\u3046\u5F62\u5BB9\u8A5E\u304C\u3074\u3063\u305F\u308A\u3067\u3001\u30CB\u30E5\u30FC\u30E8\u30FC\u30AF\u5E02\u306E\u5730\u4E0B\u9244\u306E\u6848\u5185\u8868\u793A\u3084\u3001\u30A2\u30E1\u30EA\u30AB\u30F3\u822A\u7A7A\u3001\u30A2\u30E1\u30EA\u30AB\u30F3\u30A2\u30D1\u30EC\u30EB\u3068\u3044\u3063\u305F\u4F01\u696D\u306E\u30ED\u30B4\u306B\u63A1\u7528\u3055\u308C\u3066\u3044\u308B\u3002\u3053\u306E\u30D5\u30A9\u30F3\u30C8\u3067\u300CJohn"
      );
    });
  });
});
