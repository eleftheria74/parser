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
describe("WwwInfoqComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.infoq.com/jp/news/2019/02/chrome-never-slow-mode";
      const html = fs.readFileSync("./fixtures/www.infoq.com.html");
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
      import_assert.default.equal(title, `Google Chrome\u306ENever-Slow Mode`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u4F5C\u8005\uFF1A Diogo Carleto \u7FFB\u8A33\u8005 \u4E2D\u6751 \u771F\u5B50");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-02-26T15:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Google\u306FNever-Slow Mode\u3068\u547C\u3070\u308C\u308B\u30D7\u30ED\u30C8\u30BF\u30A4\u30D7\u6A5F\u80FD\u306B\u53D6\u308A\u7D44\u3093\u3067\u3044\u308B\u3002\u3053\u306E\u30D7\u30ED\u30C8\u30BF\u30A4\u30D7\u6A5F\u80FD\u306FChromium \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u30B3\u30DF\u30C3\u30C8\u4F5C\u696D\u9032\u884C\u4E2D\u3067\u3042\u308A\u3001\u30E6\u30FC\u30B6\u30FC\u30A8\u30AF\u30B9\u30DA\u30EA\u30A8\u30F3\u30B9\u306E\u5411\u4E0A\u3001\u4E00\u8CAB\u6027\u306E\u3042\u308B\u8FC5\u901F\u306A\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u306E\u63D0\u4F9B\u3092\u76EE\u7684\u3068\u3057\u3066\u3044\u308B\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://cdn.infoq.com/statics_s1_20220809063436/styles/static/images/logo/logo-big.jpg`
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
        "\u539F\u6587(\u6295\u7A3F\u65E5\uFF1A2019/02/16)\u3078\u306E\u30EA\u30F3\u30AF Google\u306FNever-Slow"
      );
    });
  });
});
