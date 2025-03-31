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
describe("ScanNetsecurityNeJpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://scan.netsecurity.ne.jp/article/2019/03/05/42049.html";
      const html = fs.readFileSync("./fixtures/scan.netsecurity.ne.jp.html");
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
        `\u30D1\u30B9\u30EF\u30FC\u30C9\u30ED\u30C3\u30AF\u672A\u5B9F\u65BD\u306EUSB\u30E1\u30E2\u30EA\u3092\u96FB\u8ECA\u5185\u3067\u7D1B\u5931\u306E\u53EF\u80FD\u6027\uFF08\u962A\u5357\u5927\u5B66\uFF09`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, null);
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, `2019-03-04T23:15:11.000Z`);
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "\u962A\u5357\u5927\u5B66\u306F3\u67084\u65E5\u3001\u540C\u5B66\u306E\u5C02\u4EFB\u6559\u54E1\u304C\u5B66\u751F\u60C5\u5831\u7B49\u3092\u4FDD\u5B58\u3057\u305FUSB\u30E1\u30E2\u30EA\u3092\u7D1B\u5931\u3057\u305F\u3053\u3068\u304C\u5224\u660E\u3057\u305F\u3068\u767A\u8868\u3057\u305F\u3002"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://scan.netsecurity.ne.jp/imgs/ogp_f/26698.jpg`
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
        "\u516C\u5F0F\u30B5\u30A4\u30C8 \u30EA\u30EA\u30FC\u30B9\uFF08\u500B\u4EBA\u60C5\u5831\u3092\u542B\u3080USB\u30E1\u30E2\u30EA\u7D1B\u5931\u306E\u304A\u8A6B\u3073\u3068\u304A\u77E5\u3089\u305B\uFF09"
      );
    });
  });
});
