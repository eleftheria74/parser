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
describe("GenericExcerptExtractor", () => {
  describe("extract({ $, content, metaCache })", () => {
    it("returns og:description", () => {
      const actualExcerpt = "Wow this is going to be something good.";
      const html = `
        <html>
          <head>
            <meta name="og:description" value="${actualExcerpt}" />
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const metaCache = ["og:description"];
      const excerpt = import_extractor.default.extract({
        $,
        content: "",
        metaCache
      });
      import_assert.default.equal(excerpt, actualExcerpt);
    });
    it("returns twitter:description", () => {
      const actualExcerpt = "Wow this is going to be something good.";
      const html = `
        <html>
          <head>
            <meta name="twitter:description" value="${actualExcerpt}" />
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const metaCache = ["twitter:description"];
      const excerpt = import_extractor.default.extract({
        $,
        content: "",
        metaCache
      });
      import_assert.default.equal(excerpt, actualExcerpt);
    });
    it("falls back to the content", () => {
      const html = `
        <html>
          <head>
          </head>
        </html>
      `;
      const $ = import_cheerio.default.load(html);
      const content = "<div><p>Wow <b>this</b> is going to be something good.</p></div>";
      const metaCache = [];
      const excerpt = import_extractor.default.extract({
        $,
        content,
        metaCache
      });
      import_assert.default.equal(excerpt, "Wow this is going to be something good.");
    });
  });
});
describe("clean(text)", () => {
  it("truncates text longer than 200 chars and trims whitespance", () => {
    const longText = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
      fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
      culpa qui officia deserunt mollit anim id est laborum.
    `;
    const text = (0, import_extractor.clean)(longText);
    let shouldBe = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut&hellip;
    `;
    shouldBe = shouldBe.replace(/[\s\n]+/g, " ").trim();
    import_assert.default.equal(text, shouldBe);
  });
});
