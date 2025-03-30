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
var import_dek = __toESM(require("./dek"));
describe("cleanDek(dekString, { $ })", () => {
  it("returns null if the dek is < 5 chars", () => {
    const $ = import_cheerio.default.load("<div></div>");
    import_assert.default.equal((0, import_dek.default)("Hi", { $ }), null);
  });
  it("returns null if the dek is > 1000 chars", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const longDek = (
      // generate a string that is 1,280 chars
      [0, 1, 2, 3, 4, 5, 6].reduce((acc) => {
        acc += acc;
        return acc;
      }, "0123456789")
    );
    import_assert.default.equal((0, import_dek.default)(longDek, { $ }), null);
  });
  it("strip html tags from the dek", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const dek = "This is a <em>very</em> important dek.";
    import_assert.default.equal((0, import_dek.default)(dek, { $ }), "This is a very important dek.");
  });
  it("returns null if dek contains plain text link", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const dek = "This has this link http://example.com/foo/bar";
    import_assert.default.equal((0, import_dek.default)(dek, { $ }), null);
  });
  it("returns a normal dek as is", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const dek = "This is the dek";
    import_assert.default.equal((0, import_dek.default)(dek, { $ }), dek);
  });
  it("cleans extra whitespace", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const dek = "    This is the dek   ";
    import_assert.default.equal((0, import_dek.default)(dek, { $ }), "This is the dek");
  });
  it("returns null if the dek is the same as the excerpt", () => {
    const $ = import_cheerio.default.load("<div></div>");
    const excerpt = "Hello to all of my friends";
    import_assert.default.equal((0, import_dek.default)(excerpt, { $, excerpt }), null);
  });
});
