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
describe("WwwMoongiftJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.moongift.jp/2019/04/wasm-module-rust%e3%81%aewebassembly%e3%81%ae%e4%b8%ad%e3%81%a7dom%e3%82%92%e6%89%b1%e3%81%86/";
      const html = fs.readFileSync("./fixtures/www.moongift.jp.html");
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
      import_assert.default.equal(title, `wasm-module - Rust\u306EWebAssembly\u306E\u4E2D\u3067DOM\u3092\u6271\u3046`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-04-03T15:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "wasm-module - Rust\u306EWebAssembly\u306E\u4E2D\u3067DOM\u3092\u6271\u3046\u306E\u4F7F\u3044\u65B9\u3001\u65E5\u672C\u8A9E\u60C5\u5831\u306FMOONGIFT\u3067\u30C1\u30A7\u30C3\u30AF\u3002\u500B\u4EBA\u7684\u306BWebAssembly\u306B\u306F\u5F37\u304F\u671F\u5F85\u3057\u3066\u304A\u308A\u3001\u305D\u306E\u4E2D\u3067\u3082Go\u304C\u6709\u529B\u3060\u3068\u611F\u3058\u3066\u3044\u307E\u3059\u3002\u305D\u308C\u306FGo\u306EWebAssembly\u3067\u306FDOM\u3084JavaScript API\u304C\u4F7F\u3048\u308B\u304B\u3089\u3067\u3059\u3002\u99C6\u4F7F\u3059\u308C\u3070Web\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u5168\u4F53\u306E\u30B3\u30FC\u30C9\u3092Go\u3067\u66F8\u3051\u308B\u306E\u3067\u3059\u3002\u3053\u308C\u304CRust\u306B\u3082\u306A\u3044\u306E\u304C\u6B8B\u5FF5\u3067\u3057\u305F\u3002\u3057\u304B\u3057wasm-module\u304C\u65B0\u3057...\u3002MOONGIFT\u306F\u30AA\u30FC\u30D7\u30F3\u30BD\u30FC\u30B9\u30FB\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u3092\u6BCE\u65E5\u7D39\u4ECB"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://s3-ap-northeast-1.amazonaws.com/moongift/attaches/16931/list.?1553229736`
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
        "\u500B\u4EBA\u7684\u306BWebAssembly\u306B\u306F\u5F37\u304F\u671F\u5F85\u3057\u3066\u304A\u308A\u3001\u305D\u306E\u4E2D\u3067\u3082Go\u304C\u6709\u529B\u3060\u3068\u611F\u3058\u3066\u3044\u307E\u3059\u3002\u305D\u308C\u306FGo\u306EWebAssembly\u3067\u306FDOM\u3084JavaScript"
      );
    });
  });
});
