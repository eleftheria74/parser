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
describe("WwwThevergeComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.theverge.com/2016/11/29/13774648/fcc-att-zero-rating-directv-net-neutrality-vs-tmobile";
      const html = fs.readFileSync("./fixtures/www.theverge.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(
        title,
        "AT&T just declared war on an open internet (and us)"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "T.C. Sottek");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-11-29T15:00:19.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, "\u2018Mobilizing Your World\u2019 sounds like a threat now");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://cdn.vox-cdn.com/thumbor/nWeNjfNXUtcNpGGe-QVzsw89S_8=/0x16:1024x592/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52042639/vrg_tc_attarmy_1024.1480431618.jpeg"
      );
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = excerptContent(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Last year we won the open internet back, but the new regulations had"
      );
      import_assert.default.equal($(".e-image--hero").length, 1);
    });
  });
  it("returns the content from a feature", async () => {
    const html = fs.readFileSync("./fixtures/www.theverge.com--feature.html");
    const url = "http://www.theverge.com/2016/10/31/13478080/microsoft-surface-studio-design-engineering-interview";
    const { content } = await import_mercury.default.parse(url, { html, fallback: false });
    const $ = import_cheerio.default.load(content || "");
    const first13 = excerptContent(
      $("*").first().text(),
      13
    );
    import_assert.default.equal(
      first13,
      "Microsoft\u2019s Surface PCs are known for their hinges. From the first, launched alongside"
    );
  });
});
