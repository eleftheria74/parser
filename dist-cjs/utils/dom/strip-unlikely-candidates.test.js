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
var import_test_helpers = require("test-helpers");
var import_strip_unlikely_candidates = __toESM(require("./strip-unlikely-candidates"));
describe("Generic Extractor Utils", () => {
  describe("stripUnlikelyCandidates(node)", () => {
    it("returns original doc if no matches found", () => {
      const html = `
        <div id="foo">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(html);
      $ = (0, import_strip_unlikely_candidates.default)($);
      import_assert.default.equal($.html(), html);
    });
    it("strips unlikely matches from the doc", () => {
      const before = `
        <div class="header">Stuff</div>
        <div class="article">
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_strip_unlikely_candidates.default)($);
      (0, import_test_helpers.assertClean)($.html(), after);
    });
    it("keeps likely matches even when they also match the blacklist", () => {
      const before = `
        <div class="article adbox">
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article adbox">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_strip_unlikely_candidates.default)($);
      (0, import_test_helpers.assertClean)($.html(), after);
    });
    it("removed likely matches when inside blacklist node", () => {
      const before = `
        <div>
          <div class="adbox">
            <div class="article">
              <p>Ooo good one</p>
            </div>
          </div>
          <div>Something unrelated</div>
        </div>
      `;
      const after = `
        <div>
          <div>Something unrelated</div>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_strip_unlikely_candidates.default)($);
      (0, import_test_helpers.assertClean)($.html(), after);
    });
  });
});
