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
var import_index = require("./index");
describe("removeEmpty($)", () => {
  it("removes empty P tags", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <p></p>
      </div>
    `);
    const result = (0, import_index.removeEmpty)($("*").first(), $);
    (0, import_test_helpers.assertClean)(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("removes P tags with only space", () => {
    const html = "<div><p>  </p></div>";
    const $ = import_cheerio.default.load(html);
    const result = (0, import_index.removeEmpty)($("*").first(), $);
    (0, import_test_helpers.assertClean)(result.html(), "<div></div>");
  });
  it("does not remove empty DIV tags", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <p></p>
      </div>
    `);
    const result = (0, import_index.removeEmpty)($("*").first(), $);
    (0, import_test_helpers.assertClean)(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("does not remove empty p tags containing an iframe", () => {
    const html = '<div><p><span><iframe src="foo"></iframe></span></p></div>';
    const $ = import_cheerio.default.load(html);
    const result = (0, import_index.removeEmpty)($("*").first(), $);
    (0, import_test_helpers.assertClean)(result.html(), html);
  });
});
