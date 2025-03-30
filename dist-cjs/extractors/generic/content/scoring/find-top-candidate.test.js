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
const { getScore, findTopCandidate, scoreContent } = require("./index");
const fs = require("fs");
describe("findTopCandidate($)", () => {
  it("finds the top candidate from simple case", () => {
    const $ = import_cheerio.default.load(`
      <div score="100">
        <p score="1">Lorem ipsum etc</p>
      </div>
    `);
    const $$topCandidate = findTopCandidate($);
    import_assert.default.equal(getScore($$topCandidate), 100);
  });
  it("finds the top candidate from a nested case", () => {
    const $ = import_cheerio.default.load(`
      <div score="10">
        <article score="50">
          <p score="1">Lorem ipsum etc</p>
        </article>
      </div>
    `);
    const $$topCandidate = findTopCandidate($);
    import_assert.default.equal(getScore($$topCandidate.first()), 50);
  });
  it("ignores tags like BR", () => {
    const $ = import_cheerio.default.load(`
      <article score="50">
        <p score="1">Lorem ipsum br</p>
        <br score="1000" />
      </article>
    `);
    const $topCandidate = findTopCandidate($);
    import_assert.default.equal(getScore($topCandidate), 50);
  });
  it("returns BODY if no candidates found", () => {
    const $ = import_cheerio.default.load(`
      <body>
        <article>
          <p>Lorem ipsum etc</p>
          <br />
        </article>
      <body>
    `);
    const $topCandidate = findTopCandidate($);
    if (!$.browser) {
      import_assert.default.equal($topCandidate.get(0).tagName, "body");
    }
  });
  it("appends a sibling with a good enough score", () => {
    const html = fs.readFileSync(
      "./fixtures/www.latimes.com--old.html",
      "utf-8"
    );
    let $ = import_cheerio.default.load(html);
    $ = scoreContent($);
    const $topCandidate = findTopCandidate($);
    import_assert.default.equal($($topCandidate).text().length, 3652);
  });
});
