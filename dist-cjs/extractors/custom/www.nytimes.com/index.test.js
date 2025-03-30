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
var import_cheerio = __toESM(require("cheerio"));
var import_url = __toESM(require("url"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
var import_text = require("utils/text");
var import_mercury = __toESM(require("mercury"));
const fs = require("fs");
describe("NYTimesExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html";
      const html = fs.readFileSync("./fixtures/www.nytimes.com.html");
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
        "Ahmad Khan Rahami Is Arrested in Manhattan and New Jersey Bombings"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(
        author,
        "Marc Santora, William K. Rashbaum, Al Baker and Adam Goldman"
      );
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-09-19T11:46:01.000Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://static01.nyt.com/images/2016/09/20/nyregion/Manhunt/Manhunt-facebookJumbo-v2.jpg?year=2016&h=549&w=1050&s=a40dd9bd69012d95e8a76943424679f17908af4c8f7ad3a6585e0d50632fff4b&k=ZQJBKqZ0VN"
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
        "The man who the police said sowed terror across two states, setting off"
      );
    });
  });
  it("works with a feature story", async () => {
    const html = fs.readFileSync("./fixtures/www.nytimes.com--feature.html");
    const uri = "http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html";
    const { content, title, author } = await import_mercury.default.parse(uri, { html });
    const $ = import_cheerio.default.load(content);
    const text = (0, import_text.excerptContent)(
      $("*").first().text(),
      13
    );
    import_assert.default.equal(title, "I, Too, Sing America");
    import_assert.default.equal(author, "The New York Times");
    import_assert.default.equal(
      text,
      "T he Smithsonian\u2019s National Museum of African American History and Culture opens on"
    );
  });
  it("returns the title on most recent articles", async () => {
    const html = fs.readFileSync("./fixtures/www.nytimes.com--recent.html");
    const uri = "https://www.nytimes.com/2018/10/09/us/politics/nikki-haley-united-nations.html";
    const { title } = await import_mercury.default.parse(uri, { html });
    import_assert.default.equal(
      title,
      "Nikki Haley to Resign as Trump\u2019s Ambassador to the U.N."
    );
  });
});
