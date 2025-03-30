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
var import_extract_from_url = __toESM(require("./extract-from-url"));
describe("extractFromUrl(url)", () => {
  it("extracts datePublished from url", () => {
    const url = "https://example.com/2012/08/01/this-is-good";
    const regexList = [new RegExp("/(20\\d{2}/\\d{2}/\\d{2})/")];
    const result = (0, import_extract_from_url.default)(url, regexList);
    import_assert.default.equal(result, "2012/08/01");
  });
  it("returns null if nothing found", () => {
    const url = "https://example.com/this-is-good";
    const regexList = [new RegExp("/(20\\d{2}/\\d{2}/\\d{2})/")];
    const result = (0, import_extract_from_url.default)(url, regexList);
    import_assert.default.equal(result, null);
  });
});
