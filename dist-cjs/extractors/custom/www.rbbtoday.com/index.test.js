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
describe("WwwRbbtodayComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.rbbtoday.com/article/2019/04/19/169284.html";
      const html = fs.readFileSync("./fixtures/www.rbbtoday.com.html");
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
        `\u5C0F\u3055\u3044\u306E\u306B\u9AD8\u6027\u80FD\uFF01Anker\u306E\u30E2\u30D0\u30A4\u30EB\u30D7\u30ED\u30B8\u30A7\u30AF\u30BF\u30FC\u3067\u6211\u304C\u5BB6\u304C\u30DB\u30FC\u30E0\u30B7\u30A2\u30BF\u30FC\u306B`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "\u300AKT\u300B");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-04-19T00:39:34.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "\u3082\u3063\u3071\u3089\u6620\u753B\u306F\u6620\u753B\u9928\u3067\u898B\u308B\u6D3E\u306E\u7B46\u8005\u3060\u304C\u3001\u6700\u8FD1\u3001Hulu\u3084Netflix\u306A\u3069\u306E\u6620\u50CF\u914D\u4FE1\u30B5\u30FC\u30D3\u30B9\u3067\u9B45\u529B\u7684\u306A\u30C9\u30E9\u30DE\u3084\u6620\u753B\u3001\u305D\u308C\u3082\u30AA\u30EA\u30B8\u30CA\u30EB\u4F5C\u54C1\u304C\u5897\u3048\u3066\u304D\u3066\u3044\u308B\u3088\u3046\u306B\u601D\u3046\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.rbbtoday.com/imgs/ogp_f/634815.jpg`
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
        "\u3082\u3063\u3071\u3089\u6620\u753B\u306F\u6620\u753B\u9928\u3067\u898B\u308B\u6D3E\u306E\u7B46\u8005\u3060\u304C\u3001\u6700\u8FD1\u3001Hulu\u3084Netflix\u306A\u3069\u306E\u6620\u50CF\u914D\u4FE1\u30B5\u30FC\u30D3\u30B9\u3067\u9B45\u529B\u7684\u306A\u30C9\u30E9\u30DE\u3084\u6620\u753B\u3001\u305D\u308C\u3082\u30AA\u30EA\u30B8\u30CA\u30EB\u4F5C\u54C1\u304C\u5897\u3048\u3066\u304D\u3066\u3044\u308B\u3088\u3046\u306B\u601D\u3046\u3002"
      );
    });
  });
});
