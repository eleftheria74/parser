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
describe("WwwUsmagazineComExtractor", () => {
  it("is selected properly", () => {
    const url = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const extractor = (0, import_get_extractor.default)(url);
    import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
  });
  it("returns the title", async () => {
    const html = fs.readFileSync("./fixtures/www.usmagazine.com.html");
    const articleUrl = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const { title } = await import_mercury.default.parse(articleUrl, {
      html,
      fallback: false
    });
    import_assert.default.equal(
      title,
      "Lady Gaga Shares Photo of Ex Taylor Kinney Hanging With Her Mom and Now We\u2019re Confused"
    );
  });
  it("returns the author", async () => {
    const html = fs.readFileSync("./fixtures/www.usmagazine.com.html");
    const articleUrl = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const { author } = await import_mercury.default.parse(articleUrl, {
      html,
      fallback: false
    });
    import_assert.default.equal(author, "Megan French");
  });
  it("returns the date_published", async () => {
    const html = fs.readFileSync("./fixtures/www.usmagazine.com.html");
    const articleUrl = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const { date_published } = await import_mercury.default.parse(articleUrl, {
      html,
      fallback: false
    });
    import_assert.default.equal(date_published, "2016-12-07T20:53:36.000Z");
  });
  it("returns the lead_image_url", async () => {
    const html = fs.readFileSync("./fixtures/www.usmagazine.com.html");
    const articleUrl = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const { lead_image_url } = await import_mercury.default.parse(articleUrl, {
      html,
      fallback: false
    });
    import_assert.default.equal(
      lead_image_url,
      "https://i0.wp.com/www.usmagazine.com/wp-content/uploads/lady-gaga-taylor-kinney-9662aa39-cb01-4b53-9aa0-7aa8c6e3e94f.jpg?crop=0px%2C0px%2C1500px%2C788px&resize=1200%2C630&ssl=1&quality=82&strip=all"
    );
  });
  it("returns the content", async () => {
    const html = fs.readFileSync("./fixtures/www.usmagazine.com.html");
    const url = "http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419";
    const { content } = await import_mercury.default.parse(url, { html, fallback: false });
    const $ = import_cheerio.default.load(content || "");
    const first13 = (0, import_text.excerptContent)(
      $("*").first().text(),
      13
    );
    import_assert.default.equal(
      first13,
      "The Little Monsters are praying for a reunion. Lady Gaga shared a photo"
    );
  });
});
