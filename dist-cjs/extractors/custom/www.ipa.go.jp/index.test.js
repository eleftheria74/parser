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
describe("WwwIpaGoJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.ipa.go.jp/security/topics/alert20190402.html";
      const html = fs.readFileSync("./fixtures/www.ipa.go.jp.html");
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
        `\u30B4\u30FC\u30EB\u30C7\u30F3\u30A6\u30A3\u30FC\u30AF\u306B\u304A\u3051\u308B\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306B\u95A2\u3059\u308B\u6CE8\u610F\u559A\u8D77`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-04-01T15:00:00.000Z");
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
        1
      );
      import_assert.default.equal(
        first13,
        "\u30B4\u30FC\u30EB\u30C7\u30F3\u30A6\u30A3\u30FC\u30AF\u307E\u30671\u30F6\u6708\u3092\u5207\u308A\u307E\u3057\u305F\u3002\u4ECA\u5E74\u306F5\u67081\u65E5\u306B\u5E73\u6210\u304B\u3089\u4EE4\u548C\u306B\u6539\u5143\u3055\u308C\u308B\u3053\u3068\u306B\u4F34\u3044\u300110\u65E5\u9593\u306E\u8D85\u5927\u578B\u9023\u4F11\u304C\u63A7\u3048\u3066\u3044\u307E\u3059\u3002\u305D\u306E\u524D\u5F8C\u306B\u306F\u3001\u6539\u5143\u306B\u4FBF\u4E57\u3057\u305F\u65B0\u305F\u306A\u624B\u53E3\u304C\u767A\u751F\u3059\u308B\u3053\u3068\u304C\u61F8\u5FF5\u3055\u308C\u307E\u3059\u3002\u305D\u3053\u3067\u3001\u4F8B\u5E74\u3088\u308A\u65E9\u304F\u300C\u30B4\u30FC\u30EB\u30C7\u30F3\u30A6\u30A3\u30FC\u30AF\u306B\u304A\u3051\u308B\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306B\u95A2\u3059\u308B\u6CE8\u610F\u559A\u8D77\u300D\u3092\u884C\u3044\u307E\u3059\u3002"
      );
    });
  });
});
