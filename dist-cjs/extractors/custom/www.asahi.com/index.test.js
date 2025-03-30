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
describe("WwwAsahiComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.asahi.com/articles/ASM2Q5HKNM2QUCVL02D.html";
      const html = fs.readFileSync("./fixtures/www.asahi.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, `\u30E1\u30C7\u30A3\u30A2\u82B8\u8853\u796D\u8CDE\u3001\u300C\u30C1\u30B3\u3061\u3083\u3093\u306B\u53F1\u3089\u308C\u308B\uFF01\u300D\u304C\u53D7\u8CDE`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "https://www.facebook.com/asahicom/");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-03-01T04:16:56.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the excerpt", async () => {
      const { excerpt } = await result;
      import_assert.default.equal(
        excerpt,
        "\u6587\u5316\u5E81\u306F\uFF11\u65E5\u3001\u30A2\u30FC\u30C8\u3001\u30A8\u30F3\u30BF\u30FC\u30C6\u30A4\u30F3\u30E1\u30F3\u30C8\u3001\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3001\u30DE\u30F3\u30AC\u306E\uFF14\u90E8\u9580\u3067\u512A\u308C\u305F\u4F5C\u54C1\u3092\u9855\u5F70\u3059\u308B\u4ECA\u5E74\u5EA6\u306E\u30E1\u30C7\u30A3\u30A2\u82B8\u8853\u796D\u8CDE\u3092\u767A\u8868\u3057\u305F\u3002\u30A8\u30F3\u30BF\u30FC\u30C6\u30A4\u30F3\u30E1\u30F3\u30C8\u90E8\u9580\u306E\u5927\u8CDE\u306F\uFF2E\uFF28\uFF2B\u306E\u30C6\u30EC\u30D3\u756A\u7D44\u300C\u30C1\u30B3\u3061\u3083\u3093\u306B\u53F1\u2026"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.asahicom.jp/articles/images/c_AS20190301001974_comm.jpg`
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
        "\u30C1\u30B3\u3061\u3083\u3093 \u6587\u5316\u5E81\u306F\uFF11\u65E5\u3001\u30A2\u30FC\u30C8\u3001\u30A8\u30F3\u30BF\u30FC\u30C6\u30A4\u30F3\u30E1\u30F3\u30C8\u3001\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3001\u30DE\u30F3\u30AC\u306E\uFF14\u90E8\u9580\u3067\u512A\u308C\u305F\u4F5C\u54C1\u3092\u9855\u5F70\u3059\u308B\u4ECA\u5E74\u5EA6\u306E\u30E1\u30C7\u30A3\u30A2\u82B8\u8853\u796D\u8CDE\u3092\u767A\u8868\u3057\u305F\u3002\u30A8\u30F3\u30BF\u30FC\u30C6\u30A4\u30F3\u30E1\u30F3\u30C8\u90E8\u9580\u306E\u5927\u8CDE\u306F\uFF2E\uFF28\uFF2B\u306E\u30C6\u30EC\u30D3\u756A\u7D44\u300C\u30C1\u30B3\u3061\u3083\u3093\u306B\u53F1\u3089\u308C\u308B\uFF01\u300D\u304C\u53D7\u8CDE\u3057\u305F\u3002"
      );
    });
  });
});
