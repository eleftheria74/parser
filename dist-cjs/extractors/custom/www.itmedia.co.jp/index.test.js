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
describe("WwwItmediaCoJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.itmedia.co.jp/pcuser/articles/1902/22/news089.html";
      const html = fs.readFileSync("./fixtures/www.itmedia.co.jp.html");
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
        `Intel NUC\u3067\u6700\u65B0SSD\u3092\u6BD4\u8F03\u3057\u3066\u307F\u305F\uFF1A\u3055\u3089\u3070\u5E73\u6210\u3001\u3055\u3089\u3070\u6C34\u51B7\u3001\u3044\u304F\u305CNUC\uFF081/2 \u30DA\u30FC\u30B8\uFF09`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "[\u7530\u4E2D\u5B8F\u660C\uFF0CITmedia]");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-02-22T05:37:03.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Intel\u306E\u8D85\u5C0F\u578BPC\u300CNUC\u300D\u3092\u624B\u306B\u5165\u308C\u305F\u3068\u3042\u308B\u30E6\u30FC\u30B6\u30FC\u304C\u3001\u307B\u307C5\u5E74\u3076\u308A\u306BPC\u3092\u81EA\u4F5C\u3002\u4ECA\u56DE\u306F\u5B8C\u6210\u3057\u305FNUC\u3092\u4F7F\u3063\u3066NVMe SSD\u306E\u6700\u65B0\u30E2\u30C7\u30EB\u3092\u30C1\u30A7\u30C3\u30AF\u3057\u3066\u307F\u307E\u3057\u305F\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://image.itmedia.co.jp/pcuser/articles/1902/22/cover_news089.jpg`
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
        "\u3068\u3042\u308B\u81EA\u4F5CPC\u30E6\u30FC\u30B6\u30FC\u304C\u5E73\u6210\u6700\u5F8C\u306E\u5E74\u306B\u3075\u3068\u76EE\u899A\u3081\u3001\u307B\u307C5\u5E74\u3076\u308A\u306BPC\u3092\u65B0\u8ABF\u3057\u305F\u7D4C\u7DEF\u3092\u307E\u3068\u3081\u305F\u672C\u9023\u8F09\u3002\u524D\u56DE\u306E\u8A18\u4E8B\u3067\u306F\u3001Intel\u304C\u63D0\u5531\u3057\u305FNext"
      );
    });
  });
});
