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
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_extractor = __toESM(require("./extractor"));
describe("GenericDatePublishedExtractor", () => {
  describe("extract($, metaCache)", () => {
    it("extracts datePublished from meta tags", () => {
      const $ = import_cheerio.default.load(`
      <html>
        <head>
          <meta name="displaydate" value="1/1/2020 8:30 (EST)" />
        </head>
      </html>
    `);
      const metaCache = ["displaydate", "something-else"];
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache
      });
      import_assert.default.equal(result, (/* @__PURE__ */ new Date("1/1/2020 8:30 (EST)")).toISOString());
    });
    it("extracts datePublished from selectors", () => {
      const $ = import_cheerio.default.load(`
      <div>
        <div class="hentry">
          <div class="updated">
            1/1/2020 <span class="time">8:30am</span>
          </div>
        </head>
      </div>
    `);
      const metaCache = [];
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache
      });
      import_assert.default.equal(result, (/* @__PURE__ */ new Date("1/1/2020 8:30 (EST)")).toISOString());
    });
    it("extracts from url formatted /2012/08/01/etc", () => {
      const $ = import_cheerio.default.load("<div></div>");
      const metaCache = [];
      const url = "https://example.com/2012/08/01/this-is-good";
      const result = import_extractor.default.extract({
        $,
        url,
        metaCache
      });
      import_assert.default.equal(result, (/* @__PURE__ */ new Date("2012/08/01")).toISOString());
    });
    it("extracts from url formatted /2020-01-01", () => {
      const $ = import_cheerio.default.load("<div></div>");
      const metaCache = [];
      const url = "https://example.com/2020-01-01/this-is-good";
      const result = import_extractor.default.extract({
        $,
        url,
        metaCache
      });
      import_assert.default.equal(result, (0, import_moment_timezone.default)("2020-01-01", "YYYY-MM-DD").toISOString());
    });
    it("extracts from url formatted /2020/jan/01", () => {
      if (!import_cheerio.default.browser) {
        const $ = import_cheerio.default.load("<div></div>");
        const metaCache = [];
        const url = "https://example.com/2020/jan/01/this-is-good";
        const result = import_extractor.default.extract({
          $,
          url,
          metaCache
        });
        import_assert.default.equal(result, (0, import_moment_timezone.default)(/* @__PURE__ */ new Date("2020 jan 01")).toISOString());
      }
    });
    it("returns null if no date can be found", () => {
      const $ = import_cheerio.default.load("<div></div>");
      const metaCache = [];
      const result = import_extractor.default.extract({
        $,
        url: "",
        metaCache
      });
      import_assert.default.equal(result, null);
    });
  });
});
