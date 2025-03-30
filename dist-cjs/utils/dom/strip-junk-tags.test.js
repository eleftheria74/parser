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
const { stripJunkTags } = require("./index");
describe("stripJunkTags($)", () => {
  it("strips script and other junk tags", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <style>.red { color: 'red'; }</style>
        <title>WOW</title>
        <link rel="asdflkjawef" />
        <p>What an article</p>
        <script type="text/javascript">alert('hi!');</script>
        <noscript>Don't got it</noscript>
        <hr />
      </div>
    `);
    const result = stripJunkTags($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What an article</p>
      </div>
    `
    );
  });
  it("keeps youtube embeds", () => {
    let $ = import_cheerio.default.load(`
      <div>
        <style>.red { color: 'red'; }</style>
        <title>WOW</title>
        <link rel="asdflkjawef" />
        <p>What an article</p>
        <iframe class="mercury-parser-keep" src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen></iframe>
        <hr />
      </div>
    `);
    $ = stripJunkTags($("*").first(), $);
    import_assert.default.equal($('iframe[src^="https://www.youtube.com"]').length, 1);
  });
});
