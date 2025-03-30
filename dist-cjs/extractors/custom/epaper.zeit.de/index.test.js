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
describe("EpaperZeitDeExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://epaper.zeit.de/article/702225a4061dfbf97ab93df8de77e8c54aa3f5fe7a8c2799e8d425953d123acf";
      const html = fs.readFileSync("./fixtures/epaper.zeit.de.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, `Was hei\xDFt Sozialismus f\xFCr Sie, Kevin K\xFChnert?`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Politik \xB7 Jochen Bittner, Tina Hildebrandt");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, null);
    });
    it("returns the excerpt", async () => {
      const { excerpt } = await result;
      import_assert.default.equal(
        excerpt,
        "Zum Beispiel die Kollektivierung von Firmen wie BMW, sagt der Chef der Jusos. In der Wirtschaftsordnung, die er sich vorstellt, g\xE4be es auch kein Eigentum an Wohnraum mehr. Ein Gespr\xE4ch \xFCber eine radikale Alternative"
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(lead_image_url, null);
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Politik \xB7 Jochen Bittner, Tina Hildebrandt Zum Beispiel die Kollektivierung von Firmen wie"
      );
    });
  });
});
