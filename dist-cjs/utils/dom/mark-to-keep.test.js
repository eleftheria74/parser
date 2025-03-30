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
var import_assert = __toESM(require("assert"));
const { assertClean } = require("test-helpers");
const { markToKeep } = require("./index");
const { KEEP_CLASS } = require("./constants");
describe("markToKeep($)", () => {
  it("marks elements that should be kept", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What an article</p>
        <iframe src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen></iframe>
        <iframe src="foo" frameborder="0" allowfullscreen></iframe>
        <iframe src="https://player.vimeo.com/video/57712615"></iframe>
      </div>
    `);
    const result = markToKeep($("*").first(), $);
    import_assert.default.equal(result("iframe.mercury-parser-keep").length, 2);
    if (!$.browser) {
      assertClean(
        result.html(),
        `
        <div>
          <p>What an article</p>
          <iframe src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen class="mercury-parser-keep"></iframe>
          <iframe src="foo" frameborder="0" allowfullscreen></iframe>
          <iframe src="https://player.vimeo.com/video/57712615" class="mercury-parser-keep"></iframe>
        </div>
    `
      );
    }
  });
  it("marks same-domain elements to keep", () => {
    const $ = import_cheerio.default.load(
      '<div><iframe src="https://medium.com/foo/bar"></iframe></div>'
    );
    const result = markToKeep($("*").first(), $, "https://medium.com/foo");
    const keptHtml = `<div><iframe src="https://medium.com/foo/bar" class="${KEEP_CLASS}"></iframe></div>`;
    assertClean(result.html(), keptHtml);
  });
});
