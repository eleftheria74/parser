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
var import_should_score = __toESM(require("./should-score"));
describe("shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)", () => {
  it("returns false if href has already been fetched", () => {
    const previousUrls = ["http://example.com/foo/bar/2"];
    const href = "http://example.com/foo/bar/2";
    const parsedUrl = import_url.default.parse(href);
    import_assert.default.equal((0, import_should_score.default)(href, "", "", parsedUrl, "", previousUrls), false);
  });
  it("returns true if href has not been fetched", () => {
    const previousUrls = ["http://example.com/foo/bar"];
    const href = "http://example.com/foo/bar/2";
    const parsedUrl = import_url.default.parse(href);
    import_assert.default.equal((0, import_should_score.default)(href, "", "", parsedUrl, "", previousUrls), true);
  });
});
