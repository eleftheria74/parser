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
describe("WeeklyAsciiJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://weekly.ascii.jp/elem/000/000/428/428292/";
      const html = fs.readFileSync("./fixtures/weekly.ascii.jp.html");
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
        `\u666E\u901A\u306B\u4F7F\u3048\u308B\u624B\u306E\u3072\u3089\u30B5\u30A4\u30BA\u306E\u8D85\u5C0F\u578B\u30B9\u30DE\u30DB\u300CPalm Phone\u300D\u306E\u5B9F\u6A5F\u30C1\u30A7\u30C3\u30AF`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, `\u6587\u25CF \u30AA\u30AB\u30E2\u30C8\uFF0FASCII\u7DE8\u96C6\u90E8`);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-04-21T03:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://ascii.jp/img/2019/04/19/1643408/l/59bcecd731732273.jpg`
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
        "FOX\u304C\u56FD\u5185\u8CA9\u58F2\u4EE3\u7406\u5E97\u3068\u306A\u308A\u3001\u540C\u793EEC\u30B5\u30A4\u30C8\u3084\u30D7\u30E9\u30B9\u30B9\u30BF\u30A4\u30EB\u306E\u307B\u304B\u3001\u30E8\u30C9\u30D0\u30B7\u30AB\u30E1\u30E9\u3001\u30D3\u30C3\u30AF\u30AB\u30E1\u30E9\u3001Amazon.co.jp\u306A\u3069\u3067\u300124\u65E5\u304B\u3089\u8CA9\u58F2\u3055\u308C\u308B\u624B\u306E\u3072\u3089\u30B5\u30A4\u30BA\u306EAndroid\u30B9\u30DE\u30FC\u30C8\u30D5\u30A9\u30F3\u300CPalm"
      );
    });
  });
});
