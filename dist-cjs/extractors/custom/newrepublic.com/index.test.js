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
describe("NewrepublicComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://newrepublic.com/article/138859/fantastic-beasts-nice-place-visit";
      const html = fs.readFileSync("./fixtures/newrepublic.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("article returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(title, "Fantastic Beasts: A Nice Place to Visit");
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Will Leitch");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-11-18T05:00:00.000Z");
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(
        dek,
        "The glorious world-building in the first Harry Potter spin-off isn't enough to keep viewers coming back."
      );
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://images.newrepublic.com/29020c1e6b108813cf65b54487ad2b5a65aa6079.jpeg?w=1109&h=577&crop=faces&fit=crop&fm=jpg"
      );
    });
    it("article returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "The eight Harry Potter films, which stretched out over nearly a decade, had"
      );
    });
  });
  describe("minutes", async () => {
    let result;
    let url;
    beforeAll(async () => {
      url = "https://newrepublic.com/minutes/139022/maybe-donald-trumps-twitter-account-just-smoke-screen";
      const html = fs.readFileSync("./fixtures/newrepublic.com--minutes.html");
      result = await import_mercury.default.parse(url, { html, fallback: false });
    });
    it("minute returns the title", async () => {
      const { title } = await result;
      import_assert.default.equal(
        title,
        "Maybe Donald Trump\u2019s Twitter account is more than just a smoke screen."
      );
    });
    it("article returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Alex Shephard");
    });
    it("minute returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "It\u2019s been one of the most persistent narratives of the last year: Whenever"
      );
    });
  });
});
