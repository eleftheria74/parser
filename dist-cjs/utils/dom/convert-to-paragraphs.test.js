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
var import_test_helpers = require("test-helpers");
var import_convert_to_paragraphs = __toESM(require("./convert-to-paragraphs"));
describe("convertToParagraphs($)", () => {
  it("performs simple conversions", () => {
    if (!import_cheerio.default.browser) {
      const before = `
        <p>
          Here is some text
          <span>This should remain in a p</span>
          <br />
          <br />
          This should be wrapped in a p
          <div>This should become a p</div>
        </p>
        <span>This should become a p</span>
      `;
      const after = `
        <p>
          Here is some text
          <span>This should remain in a p</span>
        <p>
          This should be wrapped in a p
        </p><p>This should become a p</p>
        </p> <p>This should become a p</p>
      `;
      let $ = import_cheerio.default.load(before);
      $ = (0, import_convert_to_paragraphs.default)($);
      (0, import_test_helpers.assertClean)($.html(), after);
    }
  });
  it("does not convert a div with nested p children", () => {
    const html = `
      <div>
        <div>
          <div>
            <p>This is a paragraph</p>
          </div>
        </div>
      </div>
    `;
    let $ = import_cheerio.default.load(html);
    $ = (0, import_convert_to_paragraphs.default)($);
    (0, import_test_helpers.assertClean)($.html(), html);
  });
});
