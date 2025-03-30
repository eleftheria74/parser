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
describe("WwwPublickey1JpExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.publickey1.jp/blog/19/1ssdintel_ssd_d5-p4326qlc14643d_nandssd.html";
      const html = fs.readFileSync("./fixtures/www.publickey1.jp.html");
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
        `\u30A4\u30F3\u30C6\u30EB\u30011U\u3067\u5BB9\u91CF1\u30DA\u30BF\u30D0\u30A4\u30C8\u306ESSD\u300CIntel SSD D5-P4326\u300D\u767A\u58F2\u3002QLC\uFF081\u30BB\u30EB\u3042\u305F\u308A4\u30D3\u30C3\u30C8\uFF09\u306864\u5C64\u306E3D NAND\u6280\u8853\u3092\u7528\u3044\u3066\u5927\u5BB9\u91CFSSD\u3092\u5B9F\u73FE`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(
        author,
        "Junichi Niino\uFF08jniino\uFF09\nIT\u7CFB\u306E\u96D1\u8A8C\u7DE8\u96C6\u8005\u3001\u30AA\u30F3\u30E9\u30A4\u30F3\u30E1\u30C7\u30A3\u30A2\u767A\u884C\u4EBA\u3092\u7D4C\u3066\u72EC\u7ACB\u30022009\u5E74\u306BPublickey\u3092\u958B\u59CB\u3057\u307E\u3057\u305F\u3002\n\uFF08\u8A73\u3057\u3044\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\uFF09"
      );
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2019-04-03T15:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, null);
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://www.publickey1.jp/2019/p4236ga01.gif`
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        5
      );
      import_assert.default.equal(
        first13,
        "2019\u5E744\u67084\u65E5 \u7C73\u30A4\u30F3\u30C6\u30EB\u306F4\u67082\u65E5\u3001\u30A4\u30D9\u30F3\u30C8\u300CData-Centric Innovation Day\u300D\u3092\u958B\u50AC\u3002\u30C7\u30FC\u30BF\u30BB\u30F3\u30BF\u30FC\u5411\u3051\u306B1U\u30E9\u30C3\u30AF\u3042\u305F\u308A1\u30DA\u30BF\u30D0\u30A4\u30C8\u306E\u5BB9\u91CF\u3092\u6301\u3064SSD\u300CIntel SSD"
      );
    });
  });
});
