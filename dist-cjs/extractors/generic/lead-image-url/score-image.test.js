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
var import_score_image = require("./score-image");
describe("scoreImageUrlUrl(url)", () => {
  it("gets 20 points for a positive lead img hint", () => {
    const url = "http://example.com/upload/img.png";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url), 20);
  });
  it("loses 20 points for a negative lead img hint", () => {
    const url = "http://example.com/sprite/foo/bar.png";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url), -20);
  });
  it("loses 10 points for a gif", () => {
    const url = "http://example.com/foo/bar.gif";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url), -10);
    const url2 = "http://example.com/foogif/bar";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url2), 0);
  });
  it("gains 10 points for a jpg", () => {
    const url = "http://example.com/foo/bar.jpg";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url), 10);
    const url2 = "http://example.com/foo/bar.jpeg";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url2), 10);
    const url3 = "http://example.com/foojpg/bar";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url3), 0);
    const url4 = "http://example.com/foo.jpg?bar=baz";
    import_assert.default.equal((0, import_score_image.scoreImageUrl)(url4), 10);
  });
});
describe("scoreAttr($img)", () => {
  it("gets 5 points if the img node has an alt attribute", () => {
    const $ = import_cheerio.default.load('<div><img alt="Wow" /></div>');
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreAttr)($img), 5);
  });
  it("gets 0 points if the img node has an alt attribute", () => {
    const $ = import_cheerio.default.load("<div><img /></div>");
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreAttr)($img), 0);
  });
});
describe("scoreByParents($img)", () => {
  it("gets 25 points if it has a figure parent", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <figure>
          <div>
            <img alt="Wow" />
          </div>
        </figure>
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByParents)($img), 25);
  });
  it("gets 0 points if the img has no figure parent", () => {
    const $ = import_cheerio.default.load("<div><img /></div>");
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByParents)($img), 0);
  });
  it("gets 15 points if parent or gparent has photo hints", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <div class="figure">
          <div>
            <img alt="Wow" />
          </div>
        </div>
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByParents)($img), 15);
  });
});
describe("scoreBySibling($img)", () => {
  it("gets 25 points if its sibling is figcaption", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img />
        <figcaption>Wow</figcaption>
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreBySibling)($img), 25);
  });
  it("gets 15 points if its sibling has photo hints", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <div>
            <img alt="Wow" />
            <div class="caption">
              Wow
            </div>
        </div>
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreBySibling)($img), 15);
  });
});
describe("scoreByDimensions($img)", () => {
  it("penalizes skinny images", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img width="10" />
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByDimensions)($img), -50);
  });
  it("penalizes short images", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img height="10" />
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByDimensions)($img), -50);
  });
  it("ignores sprites", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img src="/sprite/etc/foo.png" width="1000" height="1000" />
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByDimensions)($img), 0);
  });
  it("penalizes images with small areas", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img src="/etc/foo.png" width="60" height="60" />
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByDimensions)($img), -100);
  });
  it("prefers the largest images", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img src="/etc/foo.png" width="1000" height="1000" />
      </div>
    `);
    const $img = $("img").first();
    import_assert.default.equal((0, import_score_image.scoreByDimensions)($img), 1e3);
  });
});
describe("scoreByPosition($imgs, index)", () => {
  it("gives higher scores to images that come first", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
      </div>
    `);
    const $imgs = $("img");
    import_assert.default.equal((0, import_score_image.scoreByPosition)($imgs, 0), 3);
  });
});
