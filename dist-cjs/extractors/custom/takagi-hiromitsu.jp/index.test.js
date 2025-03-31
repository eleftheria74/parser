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
var import_moment = __toESM(require("moment"));
var import_mercury = __toESM(require("mercury"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
const { excerptContent } = require("../../../resource/utils/text");
const fs = require("fs");
describe("TakagihiromitsuJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://takagi-hiromitsu.jp/diary/20190211.html";
      const html = fs.readFileSync("./fixtures/takagi-hiromitsu.jp.html");
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
        `\u25A0 \u6539\u6B63NICT\u6CD5\u304C\u30D7\u30C1\u708E\u4E0A\u3001\u5DE5\u5834\u51FA\u8377\u6642\u5171\u901A\u521D\u671F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u8B58\u5225\u7B26\u53F7\u306B\u5F53\u305F\u3089\u306A\u3044\u3053\u3068\u304C\u7406\u89E3\u3055\u308C\u3066\u3044\u306A\u3044`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u9AD8\u6728\u6D69\u5149");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      const newDatePublished = (0, import_moment.default)(date_published).format();
      import_assert.default.equal(newDatePublished.split("T")[0], "2019-02-17");
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
      import_assert.default.equal(first13, "\u5148\u6708\u306E\u3053\u3068\u3001NHK\u30CB\u30E5\u30FC\u30B9\u304C\u300C\u7DCF\u52D9\u7701");
    });
  });
});
