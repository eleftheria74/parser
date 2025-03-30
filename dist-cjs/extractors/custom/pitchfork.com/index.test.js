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
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_mercury = __toESM(require("mercury"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
const { excerptContent } = require("utils/text");
const fs = require("fs");
describe("PitchforkComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://pitchfork.com/reviews/albums/lust-for-youth-lust-for-youth/";
      const html = fs.readFileSync("./fixtures/pitchfork.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, `Lust for Youth: Lust for Youth`);
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Larry Fitzmaurice");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      const new_date_published = (0, import_moment_timezone.default)(date_published).format().split("T")[0];
      import_assert.default.equal(new_date_published, "2019-06-07");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "Hannes Norrvide's long-running coldwave synth project breaks into the greener pastures of Depeche Mode-style new wave."
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        `https://media.pitchfork.com/photos/5cefef2693a53659ed1ee6b8/16:9/w_1280,c_limit/LustForYouth_LustForYouth.jpg`
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
        "Coldwave never cared about you. The minimalistic, machine-driven sound that bubbled up twice"
      );
    });
    it("returns the score", async () => {
      const { score } = await result;
      import_assert.default.equal(score, "6.2");
    });
  });
});
