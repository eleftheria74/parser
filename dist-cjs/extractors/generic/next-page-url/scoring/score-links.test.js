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
var import_score_links = __toESM(require("./score-links"));
const fs = require("fs");
describe("scoreLinks(links)", () => {
  it("returns an object of scored links", () => {
    const html = fs.readFileSync("./fixtures/arstechnica.com.html", "utf8");
    const $ = import_cheerio.default.load(html);
    const links = $("a[href]").toArray();
    const url = "http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/";
    const scoredPages = (0, import_score_links.default)({
      links,
      articleUrl: url,
      baseUrl: "http://arstechnica.com",
      $
    });
    import_assert.default.equal(typeof scoredPages, "object");
  });
  it("returns null if no possible pages", () => {
    const $ = import_cheerio.default.load("<div><p>Hello wow</p></div>");
    const links = $("a[href]").toArray();
    const url = "http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/";
    const scoredPages = (0, import_score_links.default)({
      links,
      articleUrl: url,
      baseUrl: "http://arstechnica.com",
      $
    });
    import_assert.default.equal(scoredPages, null);
  });
});
