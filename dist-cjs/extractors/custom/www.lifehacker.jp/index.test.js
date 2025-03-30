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
describe("WwwLifehackerJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.lifehacker.jp/2019/03/amazon-fine-newspaper-stocker.html";
      const html = fs.readFileSync("./fixtures/www.lifehacker.jp.html");
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
        `\u30D5\u30A1\u30A4\u30F3\u306E\u65B0\u805E\u30B9\u30C8\u30C3\u30AB\u30FC\u306F\u5F15\u8D8A\u3057\u306B\u3082\u4F7F\u3048\u308B\uFF01 \u5BB6\u5177\u306E\u56FA\u5B9A\u3082\u7C21\u5358`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u5CF6\u6D25\u5065\u543E");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-03-08T13:00:00.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://media.loom-app.com/mpp/lifehacker/dist/images/2019/02/28/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%882019-02-2810.48.32.jpg?w=1280&h=630&f=jpg`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        2
      );
      import_assert.default.equal(
        first13,
        "\u3064\u3044\u3064\u3044\u6E9C\u3081\u3066\u3057\u307E\u3044\u3001\u6C17\u304C\u3064\u304F\u3068\u304B\u3055\u3070\u3063\u3066\u6368\u3066\u308B\u306E\u306B\u3082\u82E6\u52B4\u3059\u308B\u65B0\u805E\u7D19\u3002\u305D\u3093\u306A\u65B0\u805E\u7D19\u3092\u6368\u3066\u308B\u6642\u306B\u306F\u3001\u30D5\u30A1\u30A4\u30F3\u306E\u300C\u65B0\u805E\u30B9\u30C8\u30C3\u30AB\u30FC\u300D\u304C\u5F79\u306B\u7ACB\u3061\u307E\u3059\u3002\u65B0\u805E\u7D19\u3092\u7C21\u5358\u306B\u3001\u304F\u308B\u304F\u308B\u3063\u3068\u30C6\u30FC\u30D7\u3067\u307E\u3051\u3061\u3083\u3046\u3093\u3067\u3059\u3002Image: Amazon.co.jp\u4F7F\u3044\u65B9\u306F\u7C21\u5358\u3002\u30C6\u30FC\u30D7\u3084\u5305\u5E2F\u3092\u5DFB\u304F\u3088\u3046\u306B\u3050\u308B\u3050\u308B\u3068\u5DFB\u304D\u3064\u3051\u308B\u3060\u3051\u3002\u666E\u901A\u3060\u3063\u305F\u3089\u7D10\u3067\u307E\u3068\u3081\u307E\u3059\u304C\u3001\u4E0B\u306B\u901A\u3057\u3066\u3001\u7D50\u3093\u3067\u3001\u5207\u3063\u3066\u2026\u3068\u3001\u7D50\u69CB\u6642\u9593\u304C\u304B\u304B\u308A\u307E\u3059\u3002\u3067\u3082\u3001\u3053\u306E\u30A2\u30A4\u30C6\u30E0\u306F\u30E9\u30C3\u30D7\u30D5\u30A3\u30EB\u30E0\u3002\u30C6\u30FC\u30D7\u306E\u3088\u3046\u306B\u65B0\u805E\u306B\u5438\u7740\u3057\u3066\u304F\u308C\u308B\u306E\u3067\u3001\u304D\u3064\u304F\u7DE0\u3081\u305F\u308A\u3001\u7D50\u3076\u5FC5\u8981\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u30B5\u30AF\u30B5\u30AF\u3063\u3068\u307E\u3068\u3081\u3089\u308C\u308B\u306E\u3067\u3001\u6642\u77ED\u306B\u306A\u308B\u3053\u3068\u9593\u9055\u3044\u306A\u3057\u3067\u3059\u306D\u3002Image:"
      );
    });
  });
});
