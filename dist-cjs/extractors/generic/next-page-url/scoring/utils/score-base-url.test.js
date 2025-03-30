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
var import_score_base_url = __toESM(require("./score-base-url"));
const { makeBaseRegex } = require("../score-links");
describe("scoreBaseUrl(href, baseRegex)", () => {
  it("returns -25 if url does not contain the base url", () => {
    const baseUrl = "http://example.com/foo/bar";
    const badUrl = "http://foo.com/foo/bar";
    const baseRegex = makeBaseRegex(baseUrl);
    import_assert.default.equal((0, import_score_base_url.default)(badUrl, baseRegex), -25);
  });
  it("returns 0 if url contains the base url", () => {
    const baseUrl = "http://example.com/foo/bar";
    const badUrl = "http://example.com/foo/bar/bat";
    const baseRegex = makeBaseRegex(baseUrl);
    import_assert.default.equal((0, import_score_base_url.default)(badUrl, baseRegex), 0);
  });
});
