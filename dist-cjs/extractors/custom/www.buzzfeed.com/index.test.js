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
describe("BuzzfeedExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo";
      const html = fs.readFileSync("./fixtures/www.buzzfeed.com.html");
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
        "People Are Calling Out This Edited Picture Of Demi Lovato For Body-Shaming Her"
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "Ikran Dahir");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      import_assert.default.equal(date_published, "2016-10-03T16:35:39.000Z");
    });
    it("returns the lead_image_url", async () => {
      const { lead_image_url } = await result;
      import_assert.default.equal(
        lead_image_url,
        "https://img.buzzfeed.com/buzzfeed-static/static/2016-10/3/14/campaign_images/buzzfeed-prod-fastlane01/people-are-calling-out-this-edited-picture-of-dem-2-28558-1475518666-10_dblbig.jpg"
      );
    });
    it("returns the dek", async () => {
      const { dek } = await result;
      import_assert.default.equal(dek, 'Lovato said: "Is that how my boobs should look?"');
    });
    it("returns the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("span").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "A few months ago, Vladimir Serbanescu, a 17-year-old artist from Romania, drew this"
      );
    });
  });
  describe("splash image", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.buzzfeed.com/katiejmbaker/college-trump-supporters-the-new-counterculture?utm_term=.ckb72b58Y#.oxY8ZOWY3";
      const html = fs.readFileSync("./fixtures/www.buzzfeed.com--splash.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("returns big header images in the content", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const imgSrc = $("img").first().attr("src");
      import_assert.default.equal(
        imgSrc,
        "https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg?output-format=jpg&output-quality=auto"
      );
    });
    it("transforms the splash image to a figure and caption", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const imgSrc = $("figure img").first().attr("src");
      const figcaption = $("figure figcaption").first().text();
      import_assert.default.equal(
        imgSrc,
        "https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg?output-format=jpg&output-quality=auto"
      );
      import_assert.default.equal(
        figcaption,
        "\n                Adam Maida for BuzzFeed News\n              "
      );
    });
  });
});
