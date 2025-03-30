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
var import_text = require("utils/text");
const fs = require("fs");
describe("WwwRedditComExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "https://www.reddit.com/r/Showerthoughts/comments/awx46q/vanilla_becoming_the_default_flavour_of_ice_cream/";
      const html = fs.readFileSync("./fixtures/www.reddit.com.html");
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
        `Vanilla becoming the default flavour of ice cream is the greatest underdog story of all time.`
      );
    });
    it("returns the author", async () => {
      const { author } = await result;
      import_assert.default.equal(author, "u/benyacobi");
    });
    it("returns the date_published", async () => {
      const { date_published } = await result;
      const newDatePublished = (0, import_moment_timezone.default)(date_published).format().split("T")[0];
      const expectedDate = (0, import_moment_timezone.default)().subtract(4, "years").format().split("T")[0];
      import_assert.default.equal(newDatePublished, expectedDate);
    });
    it("returns the lead_image_url", async () => {
      const html = fs.readFileSync("./fixtures/www.reddit.com--image.html");
      const uri = "https://www.reddit.com/r/aww/comments/aybw1m/nothing_to_see_here_human/";
      const { lead_image_url } = await import_mercury.default.parse(uri, { html });
      import_assert.default.equal(
        lead_image_url,
        "https://preview.redd.it/jsc4t74psok21.jpg?auto=webp&s=9c9826487e34d399333f65beb64390206fff4125"
      );
    });
    it("returns the content for text posts", async () => {
      const { content } = await result;
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(
        first13,
        "Edit: thank you for educating me about the ubiquity of vanilla. Still, none"
      );
    });
    it("handles posts that only have a title", async () => {
      const html = fs.readFileSync(
        "./fixtures/www.reddit.com--title-only.html"
      );
      const uri = "https://www.reddit.com/r/AskReddit/comments/axtih6/what_is_the_most_worth_it_item_you_have_ever/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const first13 = (0, import_text.excerptContent)(
        $("*").first().text(),
        13
      );
      import_assert.default.equal(first13, "");
    });
    it("handles image posts", async () => {
      const html = fs.readFileSync("./fixtures/www.reddit.com--image.html");
      const uri = "https://www.reddit.com/r/aww/comments/aybw1m/nothing_to_see_here_human/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const image = $(
        'img[src="https://preview.redd.it/jsc4t74psok21.jpg?width=960&crop=smart&auto=webp&s=54349b21ff628e8c22c053509e86ba84ff9751d3"]'
      );
      import_assert.default.equal(image.length, 1);
    });
    it("handles video posts", async () => {
      const html = fs.readFileSync("./fixtures/www.reddit.com--video.html");
      const uri = "https://www.reddit.com/r/HumansBeingBros/comments/aybtf7/thanks_human/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const video = $("video");
      import_assert.default.equal(video.length, 1);
    });
    it("handles external link posts with image preview", async () => {
      const html = fs.readFileSync(
        "./fixtures/www.reddit.com--external-link.html"
      );
      const uri = "https://www.reddit.com/r/todayilearned/comments/aycizd/til_that_when_jrr_tolkiens_son_michael_signed_up/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const link = $(
        'a[href="https://www.1843magazine.com/culture/look-closer/tolkiens-drawings-reveal-a-wizard-at-work"]'
      );
      const image = $(
        'img[src="https://b.thumbs.redditmedia.com/mZhJhz9fAxHzdGRcA-tbCa06IieIIuI0YWfdSYQa3Uk.jpg"]'
      );
      import_assert.default.equal(link.length, 2);
      import_assert.default.equal(image.length, 1);
    });
    it("handles external image posts with image preview", async () => {
      const html = fs.readFileSync(
        "./fixtures/www.reddit.com--external-image.html"
      );
      const uri = "https://www.reddit.com/r/gifs/comments/4vv0sa/leonardo_dicaprio_scaring_jonah_hill_on_the/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const link = $('a[href="http://i.imgur.com/Qcx1DSD.gifv"]');
      const video = $("video");
      import_assert.default.equal(link.length, 1);
      import_assert.default.equal(video.length, 1);
    });
    it("handles external link posts with embedded media", async () => {
      const html = fs.readFileSync("./fixtures/www.reddit.com--embedded.html");
      const uri = "https://www.reddit.com/r/videos/comments/5gafop/rick_astley_never_gonna_give_you_up_sped_up_every/";
      const { content } = await import_mercury.default.parse(uri, { html });
      const $ = import_cheerio.default.load(content || "");
      const link = $('a[href="https://youtu.be/dQw4w9WgXcQ"]');
      const embed = $(
        'iframe[src^="https://www.redditmedia.com/mediaembed/5gafop"]'
      );
      import_assert.default.equal(link.length, 1);
      import_assert.default.equal(embed.length, 1);
    });
  });
});
