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
var import_normalize_meta_tags = __toESM(require("./normalize-meta-tags"));
describe("normalizeMetaTags($)", () => {
  it('replaces "content" attributes with "value"', () => {
    const test = import_cheerio.default.browser ? '<meta name="foo" value="bar">' : '<html><meta name="foo" value="bar"></html>';
    const $ = import_cheerio.default.load('<html><meta name="foo" content="bar"></html>');
    const result = (0, import_normalize_meta_tags.default)($).html();
    import_assert.default.equal(result, test);
  });
  it('replaces "property" attributes with "name"', () => {
    const test = import_cheerio.default.browser ? '<meta value="bar" name="foo">' : '<html><meta value="bar" name="foo"></html>';
    const $ = import_cheerio.default.load('<html><meta property="foo" value="bar"></html>');
    const result = (0, import_normalize_meta_tags.default)($).html();
    import_assert.default.equal(result, test);
  });
});
