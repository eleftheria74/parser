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
var import_extract_best_node = __toESM(require("extractors/generic/content/extract-best-node"));
var import_content = __toESM(require("./content"));
const fs = require("fs");
describe("extractCleanNode(article, { $, cleanConditionally, title } })", () => {
  it("cleans cruft out of a DOM node", () => {
    const html = fs.readFileSync(
      "./fixtures/www.wired.com--content-test.html",
      "utf-8"
    );
    const $ = import_cheerio.default.load(html);
    const opts = {
      stripUnlikelyCandidates: true,
      weightNodes: true,
      cleanConditionally: true
    };
    const bestNode = (0, import_extract_best_node.default)($, opts);
    const cleanNode = (0, import_content.default)(bestNode, { $, opts });
    const text = $(cleanNode).text().replace(/\n/g, "").replace(/\s+/g, " ").trim();
    import_assert.default.equal(text.length === 2656 || text.length === 2657, true);
  });
});
