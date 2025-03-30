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
describe("BiorxivOrgExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://biorxiv.org/content/10.1101/696633v1";
      const html = fs.readFileSync("./fixtures/biorxiv.org.html");
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
        `Sub-nucleosomal organization in urine cell-free DNA`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(
        author,
        "Havell Markus, Jun Zhao, Tania Contente-Cuomo, View ORCID ProfileElizabeth Raupach, Ahuva Odenheimer-Bergman, Sydney Connor, Bradon R. McDonald, Elizabeth Hutchins, Marissa McGilvery, Michelina C. de la Maza, Kendall Van Keuren-Jensen, Patrick Pirrotte, Ajay Goel, Carlos Becerra, Daniel D. Von Hoff, Scott A. Celinski, Pooja Hingorani, View ORCID ProfileMuhammed Murtaza"
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
        "Cell-free DNA (cfDNA) in urine is a promising analyte for noninvasive diagnostics. However,"
      );
    });
  });
});
