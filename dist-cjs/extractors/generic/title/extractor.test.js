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
describe("GenericTitleExtractor", () => {
  describe("extract({ $, url, cachedMeta })", () => {
    it("extracts strong meta title tags", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <meta name="dc.title" value="This Is the Title Okay" />
      <html>
    `);
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache: ["dc.title", "something-else"]
      });
      import_assert.default.equal(result, "This Is the Title Okay");
    });
    it("pulls title from selectors lacking string meta", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <article class="hentry">
          <h1 class="entry-title">This Is the Title Okay</h1>
        </article>
      <html>
    `);
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache: ["og:title", "something-else"]
      });
      import_assert.default.equal(result, "This Is the Title Okay");
    });
    it("then falls back to weak meta title tags", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <meta name="og:title" value="This Is the Title Okay" />
      <html>
    `);
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache: ["og:title", "something-else"]
      });
      import_assert.default.equal(result, "This Is the Title Okay");
    });
  });
  it("then falls back to weak selectors", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <head>
          <title>This Is the Weak Title Okay</title>
        </head>
      <html>
    `);
    const result = import_extractor.default.extract({ $, url: "", metaCache: [] });
    import_assert.default.equal(result, "This Is the Weak Title Okay");
  });
});
