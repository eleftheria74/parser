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
describe("JapanCnetComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://japan.cnet.com/article/35135610/";
      const html = fs.readFileSync("./fixtures/japan.cnet.com.html");
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
        `\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u3068AI\u9032\u5316\u306E\u4E21\u7ACB\u306A\u308B\u304B\uFF1F--Apple\u30CB\u30E5\u30FC\u30B9\u4E00\u6C17\u8AAD\u307F`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u677E\u6751\u592A\u90CE");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-04-13T00:00:00.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://japan.cnet.com/storage/2018/04/17/ff31ccbe32e0093ce9e0613e80f4bb2e/t/640/480/d/applenes_1280.png`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        1
      );
      import_assert.default.equal(first13, "4\u67081\u65E5\uFF5E4\u67087\u65E5\u306EApple\u306B\u95A2\u9023\u3059\u308BCNET");
    });
  });
});
