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
describe("IciRadioCanadaCaExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://ici.radio-canada.ca/nouvelle/1022038/kpmg-comptables-fiscalite-impots-paradis-fiscaux-juge-bocock-cocktail";
      const html = fs.readFileSync("./fixtures/ici.radio-canada.ca.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "Affaire KPMG : un juge se r\xE9cuse");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(
        author,
        "Zone Justice et faits divers - ICI.Radio-Canada.ca"
      );
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2017-03-13T23:18:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Un juge de la Cour de l'imp\xF4t se r\xE9cuse d'un dossier mettant en cause un stratag\xE8me du cabinet comptable KPMG. Selon les \xE9missions Enqu\xEAte et The Fifth Estate, le juge Bocock avait particip\xE9 \xE0 une soir\xE9e cocktail organis\xE9e par un cabinet d'avocats li\xE9 \xE0 l'affaire."
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://images.radio-canada.ca/v1/ici-info/16x9/randall-bocock-juge.jpg?im=Resize=(1250);Composite=(type=URL,url=https://images.radio-canada.ca/v1/assets/elements/16x9/outdated-content-2017.png),gravity=SouthEast,placement=Over,location=(0,0),scale=1"
      );
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
        "Un texte de Fr\xE9d\xE9ric Zalac d'Enqu\xEAte Jusqu\u2019\xE0 la semaine derni\xE8re, le juge Randall"
      );
    });
  });
});
