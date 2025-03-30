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
var import_cheerio = __toESM(require("cheerio"));
var import_assert = __toESM(require("assert"));
var import_test_helpers = require("test-helpers");
var import_rewrite_top_level = __toESM(require("./rewrite-top-level"));
describe("rewriteTopLevel(node, $)", () => {
  it("turns html and body tags into divs", () => {
    const $ = import_cheerio.default.load(`
        <html><body><div><p><a href="">Wow how about that</a></p></div></body></html>
    `);
    const result = (0, import_rewrite_top_level.default)($("html").first(), $);
    import_assert.default.equal(result("html").length, 0);
    import_assert.default.equal(result("body").length, 0);
    if (!import_cheerio.default.browser) {
      (0, import_test_helpers.assertClean)(
        result.html(),
        `
        <div><div><div><p><a href="">Wow how about that</a></p></div></div></div>
      `
      );
    }
  });
});
