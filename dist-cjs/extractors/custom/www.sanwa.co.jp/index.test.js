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
describe("WwwSanwaCoJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.sanwa.co.jp/news/201903/ma-irfp139bk/index.html";
      const html = fs.readFileSync("./fixtures/www.sanwa.co.jp.html");
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
        `\u6307\u7D0B\u8A8D\u8A3C\u3067Windows 10\u306B\u30B5\u30A4\u30F3\u30A4\u30F3\u3067\u304D\u308B\u6307\u7D0B\u8A8D\u8A3C\u6A5F\u80FD\u4ED8\u304D\u30DE\u30A6\u30B9\u3092\u767A\u58F2`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-03-07T15:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Windows 10\u306E\u30B5\u30A4\u30F3\u30A4\u30F3\u3092\u6307\u7D0B\u306B\u3088\u308A\u7C21\u5358\u30FB\u5B89\u5168\u306B\u884C\u3048\u308B\u6307\u7D0B\u8A8D\u8A3C\u6A5F\u80FD\u4ED8\u304DUSB\u6709\u7DDA\u30DE\u30A6\u30B9\u300CMA-IRFP139BK\u300D\u3092\u767A\u58F2\u3057\u307E\u3057\u305F\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://cdn.sanwa.co.jp/product/syohin_img/M/MA-IRFP139BK_MDX.jpg"
      );
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
        "\u30B5\u30F3\u30EF\u30B5\u30D7\u30E9\u30A4\u682A\u5F0F\u4F1A\u793E\uFF08\u672C\u793E\uFF1A\u5CA1\u5C71\u5E02\u5317\u533A\u7530\u753A1-10-1\u3001\u4EE3\u8868\u53D6\u7DE0\u5F79\u793E\u9577 \u5C71\u7530\u54F2\u4E5F)\u306F\u3001\u6307\u7D0B\u306B\u3088\u308AWindows 10\u306E\u30B5\u30A4\u30F3\u30A4\u30F3\u3092\u7C21\u5358\u30FB\u5B89\u5168\u306B\u884C\u3048\u308B\u6307\u7D0B\u8A8D\u8A3C\u6A5F\u80FD\u4ED8\u304DUSB\u6709\u7DDA\u30DE\u30A6\u30B9\u300CMA-IRFP139BK\u300D\u3092\u767A\u58F2\u3057\u307E\u3057\u305F\u3002"
      );
    });
  });
});
