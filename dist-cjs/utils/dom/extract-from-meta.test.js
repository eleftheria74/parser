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
const { extractFromMeta } = require("./index");
describe("extractFromMeta($, metaNames, cachedNames, cleanTags)", () => {
  it("extracts an arbitrary meta tag by name", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <meta name="foo" value="bar" />
      </html>
    `);
    const result = extractFromMeta($, ["foo", "baz"], ["foo", "bat"]);
    import_assert.default.equal(result, "bar");
  });
  it("returns nothing if a meta name is duplicated", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="baz" />
      </html>
    `);
    const result = extractFromMeta($, ["foo", "baz"], ["foo", "bat"]);
    import_assert.default.equal(result, null);
  });
  it("ignores duplicate meta names with empty values", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <meta name="foo" value="bar" />
        <meta name="foo" value="" />
      </html>
    `);
    const result = extractFromMeta($, ["foo", "baz"], ["foo", "bat"]);
    import_assert.default.equal(result, "bar");
  });
});
