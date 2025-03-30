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
var import_cheerio = __toESM(require("cheerio"));
const { assertClean } = require("test-helpers");
const { cleanHeaders } = require("./index");
describe("cleanHeaders(article, $)", () => {
  it("parses html and returns the article", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <h2>Lose me</h2>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `);
    const result = cleanHeaders($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("removes headers when the header text matches the title", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <h2>Title Match</h2>
        <p>What do you think?</p>
      </div>
    `);
    const result = cleanHeaders($("*").first(), $, "Title Match");
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("removes headers with a negative weight", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <h2 class="advert">Bad Class, Bad Weight</h2>
        <p>What do you think?</p>
      </div>
    `);
    const result = cleanHeaders($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });
});
