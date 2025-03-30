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
describe("BuzzapJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://buzzap.jp/news/20190302-reduced-tax-rate-benefit/";
      const html = fs.readFileSync("./fixtures/buzzap.jp.html");
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
        `\u3010\uFF1F\u3011\u300C\u6D88\u8CBB\u5897\u7A0E\u306E\u8EFD\u6E1B\u7A0E\u7387\u306F\u9AD8\u6240\u5F97\u8005\u307B\u3069\u304A\u5F97\uFF01\u300D\u7DCF\u52D9\u7701\u304C\u8B0E\u4ED5\u69D8\u3067\u3042\u308B\u3053\u3068\u3092\u8A8D\u3081\u308B`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-03-02T09:18:32.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://buzzap.net/images/2018/11/29/consumption-tax-opportunistic-price-hike/top.jpg`
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
        "\u5BB6\u8A08\u306E\u8CA0\u62C5\u3092\u548C\u3089\u3052\u308B\u305F\u3081\u306E\u8EFD\u6E1B\u7A0E\u7387\u306E\u306F\u305A\u3067\u3057\u305F\u304C\u3001\u4F4E\u6240\u5F97\u8005\u307B\u3069\u6069\u6075\u304C\u8584\u3044\u3053\u3068\u3092\u7DCF\u52D9\u7701\u304C\u516C\u5F0F\u306B\u8A8D\u3081\u307E\u3057\u305F\u3002\u8A73\u7D30\u306F\u4EE5\u4E0B\u304B\u3089\u3002"
      );
    });
  });
});
