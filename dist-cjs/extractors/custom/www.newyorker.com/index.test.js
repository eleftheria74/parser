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
describe("NewYorkerExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing";
      const html = fs.readFileSync("./fixtures/www.newyorker.com.html");
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
        "Hacking, Cryptography, and the Countdown to Quantum Computing"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Alex Hutchinson");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-09-26T14:04:22.000Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://media.newyorker.com/photos/59097a5e8b51cf59fc4239f5/16:9/w_1280,c_limit/Hutchinson-Quantum-Computing.jpg"
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
        "In a laboratory in Shanghai, researchers work on developing a quantum computer\u2014a new"
      );
    });
  });
  describe("magazine content", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.newyorker.com/magazine/2016/12/05/lessons-from-my-mother";
      const html = fs.readFileSync(
        "./fixtures/www.newyorker.com--magazine.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("returns the dek when present", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "I had a sense that she was a good teacher, but I had no idea that she was such an influential one, and in the very area I had chosen."
      );
    });
    it("returns the date for magazine content", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-11-28T00:00:00.000Z");
    });
  });
  describe("article with multiple authors", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.newyorker.com/humor/daily-shouts/teas-you-should-probably-get-rid-of-already";
      const html = fs.readFileSync(
        "./fixtures/www.newyorker.com--multiple-authors.html"
      );
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("returns multiple authors", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Ysabel Yates Illustration by Claire Lordon");
    });
  });
});
