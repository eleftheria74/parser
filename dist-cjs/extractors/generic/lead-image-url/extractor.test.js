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
var import_extractor = __toESM(require("./extractor"));
describe("GenericLeadImageUrlExtractor", () => {
  describe("extract({ $, content, metaCache })", () => {
    it("returns og:image first", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <head>
          <meta name="og:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `);
      const content = $("*").first();
      const metaCache = ["og:image"];
      const result = import_extractor.default.extract({
        $,
        content,
        metaCache
      });
      import_assert.default.equal(result, "http://example.com/lead.jpg");
    });
    it("returns twitter:image", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <head>
          <meta name="twitter:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `);
      const content = $("*").first();
      const metaCache = ["twitter:image"];
      const result = import_extractor.default.extract({
        $,
        content,
        metaCache
      });
      import_assert.default.equal(result, "http://example.com/lead.jpg");
    });
    it("finds images based on scoring", () => {
      const $ = import_cheerio.default.load(`
      <div>
        <img src="http://example.com/sprite/abadpic.jpg" />
        <img src="http://example.com/upload/goodpic.jpg" />
        <img src="http://example.com/upload/whateverpic.png" />
      </div>
    `);
      const content = $("*").first();
      const metaCache = [];
      const result = import_extractor.default.extract({
        $,
        content,
        metaCache
      });
      import_assert.default.equal(result, "http://example.com/upload/goodpic.jpg");
    });
    it("returns image based on selectors", () => {
      const $ = import_cheerio.default.load(`
      <div>
        <link rel="image_src" href="http://example.com/upload/goodpic.jpg">
      </div>
    `);
      const content = $("*").first();
      const metaCache = [];
      const result = import_extractor.default.extract({
        $,
        content,
        metaCache
      });
      import_assert.default.equal(result, "http://example.com/upload/goodpic.jpg");
    });
  });
});
