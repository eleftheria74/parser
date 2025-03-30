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
var import_brs_to_ps = __toESM(require("./brs-to-ps"));
const { assertClean } = require("test-helpers");
describe("Generic Extractor Utils", () => {
  describe("brsToPs(node)", () => {
    it("does nothing when no BRs present", () => {
      const html = `
        <div id="entry">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(html);
      $ = (0, import_brs_to_ps.default)($);
      import_assert.default.equal($.html(), html);
    });
    it("does nothing when a single BR is present", () => {
      const before = `
        <div class="article adbox">
          <br>
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article adbox">
          <br>
          <p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_brs_to_ps.default)($);
      assertClean($.html(), after);
    });
    it("converts double BR tags to an empty P tag", () => {
      const before = `
        <div class="article adbox">
          <br />
          <br />
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article adbox">
          <p> </p><p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_brs_to_ps.default)($);
      assertClean($.html(), after);
    });
    it("converts several BR tags to an empty P tag", () => {
      const before = `
        <div class="article adbox">
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article adbox">
          <p> </p><p>Ooo good one</p>
        </div>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_brs_to_ps.default)($);
      assertClean($.html(), after);
    });
    it("converts BR tags in a P tag into a P containing inline children", () => {
      const before = `
        <p>
          Here is some text
          <br />
          <br />
          Here is more text
        </p>
      `;
      const after = `
        <p>
          Here is some text
        <p>
          Here is more text
        </p></p>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_brs_to_ps.default)($);
      assertClean($.html(), after);
    });
  });
});
