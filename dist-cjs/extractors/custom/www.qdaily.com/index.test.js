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
describe("WwwQdailyComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.qdaily.com/articles/38282.html";
      const html = fs.readFileSync("./fixtures/www.qdaily.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "\u8FD9\u4E2A\u7EA6\u4F1A\u8F6F\u4EF6\uFF0C\u60F3\u7528\u4F60\u548C\u5BF9\u65B9\u7684\u76F8\u4F3C\u597D\u6076\u6765\u5E2E\u4F60\u627E\u5BF9\u8C61");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u8C22\u82E5\u542B");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2017-03-01T06:27:02.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, "\u4EBA\u4EEC\u5BF9\u4E8E\u8BA8\u538C\u7684\u4E8B\u7269\u603B\u662F\u80FD\u5F88\u6709\u5171\u540C\u8BDD\u9898...");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "http://img.qdaily.com/article/article_show/20170228225314Dh4XvM63TzkWPNHJ.png?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first3 = excerptContent(
        $("*").first().text(),
        3
      );
      import_assert.default.equal(
        first3,
        "\u65E0\u6CD5\u5FCD\u53D7\u4E61\u6751\u97F3\u4E50\uFF1F \u5BF9\u67D0\u67D0\u660E\u661F\u8FF7\u4E4B\u538C\u6076\uFF1F \u8BA8\u538C\u7279\u6717\u666E\uFF1F\u4E0D\u7231\u81EA\u62CD\uFF1F"
      );
    });
  });
});
