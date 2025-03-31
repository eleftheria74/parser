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
describe("WwwJnsaOrgExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.jnsa.org/seminar/nsf/2019kansai/index.html";
      const html = fs.readFileSync("./fixtures/www.jnsa.org.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(
        title,
        `NSF 2019 in Kansai \u300C\u65E9\u671F\u767A\u898B\u3001\u65E9\u671F\u5BFE\u51E6\u300D\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3 \uFF5E\u5B88\u308A\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u304B\u3089\u653B\u3081\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3078\uFF5E`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, null);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the excerpt", async () => {
      const { excerpt } = await result;
      import_assert.default.equal(
        excerpt,
        "Wannacry\u3068\u3044\u3063\u305F\u30E9\u30F3\u30B5\u30E0\u30A6\u30A7\u30A2\u3084Mirai\u3001Satori\u3068\u3044\u3063\u305FIoT\u3092\u72D9\u3063\u305F\u30DE\u30EB\u30A6\u30A7\u30A2\u653B\u6483\u304C\u5897\u52A0\u3057\u3066\u3044\u307E\u3059\u3002\u305D\u3057\u3066\u3001\u4ECA\u5F8C\u3001\u5236\u5FA1\u30B7\u30B9\u30C6\u30E0\u3084\u5DE5\u5834\u306EIIoT\u306A\u3069\u306B\u3082\u653B\u6483\u304C\u5897\u52A0\u3057\u3001\u5E83\u7BC4\u56F2\u306B\u30EA\u30B9\u30AF\u304C\u5E83\u304C\u308B\u3068\u898B\u3089\u308C\u3066\u304A\u308A\u3001\u884C\u653F\u3001\u30E1\u30C7\u30A3\u30A2\u3001\u307E\u305F\u5404\u30D9\u30F3\u30C0\u30FC\u304B\u3089\u3001\u300C\u5371\u306A\u3044\uFF01\u300D\u3001\u300C\u5BFE\u7B56\u3092\uFF01\u300D\u3068\u3044\u3046\u58F0\u304C\u591A\u304F\u51FA\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u3057\u304B\u3057\u3001\u4ECA\u3001\u3053\u3046\u3044\u3046\u3068\u304D\u3060\u304B\u3089\u3053\u305D\u3001\u51B7\u9759\u306B\u5730\u306B\u8DB3\u304C\u3064\u3044\u305F\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3092\u8003\u3048\u3066\u307F\u307E\u305B\u3093\u304B\u3002\u30B5\u30A4\u30D0\u30FC\u653B\u6483\u306F\u5927\u304D\u306A\u8105\u5A01\u3067\u3059\u304C\u3001\u305D\u308C\u4EE5\u524D\u306B\u30D2\u30E5\u30FC\u30DE\u30F3\u30A8\u30E9\u30FC\u3084\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3068\u3044\u3063\u305F\u3001\u57FA\u672C\u7684\u306A\u904B\u7528\u306B\u53D6\u308A\u7D44\u3093\u3067\u3044\u308B\u306E\u304B\u3001\u81EA\u7D44\u7E54\u304C\u672C\u5F53\u306B\u3055\u3089\u3055\u308C\u3066\u3044\u308B\u30EA\u30B9\u30AF\u306F\u4F55\u304B\u3001\u7D4C\u55B6\u8005\u306F\u30EA\u30B9\u30AF\u3092\u628A\u63E1\u3057\u305F\u3046\u3048\u3067\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3078\u306E\u6295\u8CC7\u306B\u3064\u306A\u3052\u308B\u3053\u3068\u304C\u3067\u304D\u3066\u3044\u308B\u306E\u304B\u3001\u305D\u306E\u305F\u3081\u306B\u306F\u3069\u3046\u3059\u308C\u3070\u826F\u3044\u306E\u304B\u3001\u3068\u3044\u3063\u305F\u3053\u3068\u3092\u8003\u3048\u308B\u6A5F\u4F1A\u3092\u63D0\u4F9B\u3057\u3001\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u5BFE\u7B56\u306B\u95A2\u5FC3\u3092\u6301\u3063\u3066\u9802\u304D\u305F\u3044\u3068\u8003\u3048\u3066\u304A\u308A\u307E\u3059\u3002\u305C\u3072\u591A\u304F\u306E\u65B9\u306E\u5FA1\u53C2\u52A0\u3092\u304A\u5F85\u3061\u3057\u3066\u304A\u308A\u307E\u3059\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.jnsa.org/images/obj/img_thumb_seminar-event.png`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        2
      );
      import_assert.default.equal(
        first13,
        "\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u5BFE\u7B56\u3092\u4E88\u9632\u3001\u9632\u5FA1\u3001\u691C\u77E5\u3001\u56DE\u5FA9\u3068\u5206\u985E\u3059\u308B\u3068\u3001\u3053\u308C\u307E\u3067\u306F\u9632\u5FA1\u306B\u91CD\u304D\u3092\u304A\u3044\u3066\u304D\u305F\u306E\u3067\u306F\u306A\u3044\u3067\u3057\u3087\u3046\u304B\u3002 \u30B7\u30B9\u30C6\u30E0\u8A2D\u8A08\u306B\u306F\u7D4C\u55B6\u76EE\u6A19\u3092\u5B9F\u73FE\u3057\u3001\u30A4\u30F3\u30B7\u30C7\u30F3\u30C8\u304C\u767A\u751F\u3057\u3066\u3082\u65E9\u671F\u767A\u898B\u3001\u65E9\u671F\u5BFE\u51E6\u3092\u3059\u308B\u305F\u3081\u306E\u4ED5\u7D44\u307F\u3092\u76DB\u308A\u8FBC\u3080\u3053\u3068\u304C\u91CD\u8981\u3067\u3059\u3002"
      );
    });
  });
});
