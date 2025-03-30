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
describe("GenericUrlExtractor", () => {
  describe("extract({ $, url })", () => {
    it("returns canonical url and domain first", () => {
      const fullUrl = "https://example.com/blog/post?utm_campain=poajwefpaoiwjefaepoj";
      const clean = "https://example.com/blog/post";
      const html = `
        <html>
          <head>
            <link rel="canonical" href="${clean}" />
            <meta name="og:url" value="${clean}" />
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const { url, domain } = import_extractor.default.extract({ $, url: fullUrl });
      import_assert.default.equal(url, clean);
      import_assert.default.equal(domain, "example.com");
    });
    it("returns og:url second", () => {
      const fullUrl = "https://example.com/blog/post?utm_campain=poajwefpaoiwjefaepoj";
      const clean = "https://example.com/blog/post";
      const html = `
        <html>
          <head>
            <meta name="og:url" value="${clean}" />
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const metaCache = ["og:url"];
      const { url, domain } = import_extractor.default.extract({
        $,
        url: fullUrl,
        metaCache
      });
      import_assert.default.equal(url, clean);
      import_assert.default.equal(domain, "example.com");
    });
    it("returns passed url if others are not found", () => {
      const fullUrl = "https://example.com/blog/post?utm_campain=poajwefpaoiwjefaepoj";
      const html = `
        <html>
          <head>
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const metaCache = [];
      const { url, domain } = import_extractor.default.extract({
        $,
        url: fullUrl,
        metaCache
      });
      import_assert.default.equal(url, fullUrl);
      import_assert.default.equal(domain, "example.com");
    });
  });
});
