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
describe("NewsMynaviJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://news.mynavi.jp/article/20190222-775563/";
      const html = fs.readFileSync("./fixtures/news.mynavi.jp.html");
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
        `\u4EBA\u6C17\u306E\u5727\u7E2E\u30FB\u89E3\u51CD\u30BD\u30D5\u30C8\u300CWinRAR\u300D\u306B\u8106\u5F31\u6027\u3001\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3092`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u8457\u8005\uFF1A\u5F8C\u85E4\u5927\u5730");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-02-22T08:23:44.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Check Point Software Technologies\u306F2\u670820\u65E5(\u7C73\u56FD\u6642\u9593)\u3001\u4EBA\u6C17\u306E\u9AD8\u3044\u5727\u7E2E\u30FB\u89E3\u51CD\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u3067\u3042\u308BWinRAR\u306B\u9577\u5E74\u306B\u308F\u305F\u3063\u3066\u8106\u5F31\u6027\u304C\u5B58\u5728\u3057\u3066\u3044\u308B\u3068\u4F1D\u3048\u305F\u3002\u3053\u306E\u8106\u5F31\u6027\u306E\u5F71\u97FF\u3067\u3001\u7D30\u5DE5\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB\u3092\u5C55\u958B\u3059\u308B\u6BB5\u968E\u3067\u30DE\u30EB\u30A6\u30A7\u30A2\u306B\u611F\u67D3\u3055\u305B\u3089\u308C\u308B\u53EF\u80FD\u6027\u304C\u3042\u308B\u3068\u3044\u3046\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://news.mynavi.jp/techplus/article/20190222-775563/index_images/index.jpg`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Check Point Software Technologies\u306F2\u670820\u65E5(\u7C73\u56FD\u6642\u9593)\u3001\u300CExtracting a 19 Year Old Code Execution from WinRAR -"
      );
    });
  });
});
