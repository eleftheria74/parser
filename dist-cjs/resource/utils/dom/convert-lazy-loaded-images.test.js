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
var import_convert_lazy_loaded_images = __toESM(require("./convert-lazy-loaded-images"));
describe("convertLazyLoadedImages($)", () => {
  it("moves image links to src if placed in another attribute", () => {
    const $ = import_cheerio.default.load('<img data-src="http://example.com/foo.jpg">');
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(
      result,
      '<img data-src="http://example.com/foo.jpg" src="http://example.com/foo.jpg">'
    );
  });
  it("moves image source candidates to srcset if placed in another attribute", () => {
    const $ = import_cheerio.default.load('<img data-srcset="http://example.com/foo.jpg 2x">');
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(
      result,
      '<img data-srcset="http://example.com/foo.jpg 2x" srcset="http://example.com/foo.jpg 2x">'
    );
  });
  it("moves image source candidates containing query strings to srcset if placed in another attribute", () => {
    const $ = import_cheerio.default.load(
      '<img data-srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x">'
    );
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(
      result,
      '<img data-srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x" srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x">'
    );
  });
  it("properly handles src and srcset attributes", () => {
    const $ = import_cheerio.default.load(
      '<img data-src="http://example.com/foo.jpg" data-srcset="http://example.com/foo.jpg 2x">'
    );
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(
      result,
      '<img data-src="http://example.com/foo.jpg" data-srcset="http://example.com/foo.jpg 2x" src="http://example.com/foo.jpg" srcset="http://example.com/foo.jpg 2x">'
    );
  });
  it("does nothing when value is not a link", () => {
    const $ = import_cheerio.default.load('<img data-src="foo.jpg">');
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(result, '<img data-src="foo.jpg">');
  });
  it("does nothing when value is not an image", () => {
    const $ = import_cheerio.default.load('<img data-src="http://example.com">');
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(result, '<img data-src="http://example.com">');
  });
  it("does not change a correct img with src", () => {
    const $ = import_cheerio.default.load('<img src="http://example.com/foo.jpg">');
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(result, '<img src="http://example.com/foo.jpg">');
  });
  it("does not replace an img src with srcset value", () => {
    const $ = import_cheerio.default.load(
      '<img src="http://example.com/foo.jpg" srcset="http://example.com/foo2x.jpg 2x, http://example.com/foo.jpg">'
    );
    const result = (0, import_convert_lazy_loaded_images.default)($).html();
    import_assert.default.equal(
      result,
      '<img src="http://example.com/foo.jpg" srcset="http://example.com/foo2x.jpg 2x, http://example.com/foo.jpg">'
    );
  });
});
