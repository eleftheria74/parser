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
const { getWeight } = require("./index");
describe("Generic Extractor Utils", () => {
  describe("getWeight(node)", () => {
    it("returns a score of 25 if node has positive id", () => {
      const $ = import_cheerio.default.load(`
        <div id="entry">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 25);
    });
    it("returns a score of -25 if node has negative id", () => {
      const $ = import_cheerio.default.load(`
        <div id="adbox">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), -25);
    });
    it("returns a score of 25 if node has positive class", () => {
      const $ = import_cheerio.default.load(`
        <div class="entry">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 25);
    });
    it("returns a score of -25 if node has negative class", () => {
      const $ = import_cheerio.default.load(`
        <div id="comment ad">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), -25);
    });
    it("returns a score of 25 if node has both positive id and class", () => {
      const $ = import_cheerio.default.load(`
        <div id="article" class="entry">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 25);
    });
    it("returns a score of 25 if node has pos id and neg class", () => {
      const $ = import_cheerio.default.load(`
        <div id="article" class="adbox">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 25);
    });
    it("returns a score of 10 if node has pos img class", () => {
      const $ = import_cheerio.default.load(`
        <div class="figure">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 10);
    });
    it("returns a score of 35 if node has pos id pos img class", () => {
      const $ = import_cheerio.default.load(`
        <div id="article" class="figure">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 35);
    });
    it("adds an add'l 25 (total 50) if node uses entry-content-asset class", () => {
      const $ = import_cheerio.default.load(`
        <div id="foo" class="entry-content-asset">
          <p>Ooo good one</p>
        </div>
      `);
      import_assert.default.equal(getWeight($("div")), 50);
    });
  });
});
