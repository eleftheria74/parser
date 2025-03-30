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
var import_get_extractor = __toESM(require("./get-extractor"));
describe("getExtractor(url)", () => {
  it("returns GenericExtractor if no custom extractor is found", () => {
    const extractor = (0, import_get_extractor.default)(
      "http://example.com",
      null,
      import_cheerio.default.load("<div />")
    );
    import_assert.default.equal(extractor.domain, "*");
  });
  it("returns a custom extractor if found", () => {
    const extractor = (0, import_get_extractor.default)("https://nymag.com");
    import_assert.default.equal(extractor.domain, "nymag.com");
  });
  it("falls back to base domain if subdomain not found", () => {
    const extractor = (0, import_get_extractor.default)("https://googleblog.blogspot.com");
    import_assert.default.equal(extractor.domain, "blogspot.com");
  });
  it("falls back to base domain if subdomain not found", () => {
    const extractor = (0, import_get_extractor.default)("https://en.m.wikipedia.org");
    import_assert.default.equal(extractor.domain, "wikipedia.org");
  });
  it("returns a custom extractor based on detectors", () => {
    const html = '<head><meta name="al:ios:app_name" value="Medium" /></head>';
    const $ = import_cheerio.default.load(html);
    const extractor = (0, import_get_extractor.default)("http://foo.com", null, $);
    import_assert.default.equal(extractor.domain, "medium.com");
  });
});
