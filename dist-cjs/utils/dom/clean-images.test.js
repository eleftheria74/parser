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
const { cleanImages } = require("./index");
describe("cleanImages($)", () => {
  it("removes images with small heights/widths", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img width="5" height="5" />
        <img width="50" />
      </div>
    `);
    const result = cleanImages($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img width="50">
      </div>
    `
    );
  });
  it("removes height attribute from images that remain", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img width="50" height="50" />
      </div>
    `);
    const result = cleanImages($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img width="50">
      </div>
    `
    );
  });
  it("removes spacer/transparent images", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <img src="/foo/bar/baz/spacer.png" />
        <img src="/foo/bar/baz/normal.png" />
        <p>Some text</p>
      </div>
    `);
    const result = cleanImages($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img src="/foo/bar/baz/normal.png">
        <p>Some text</p>
      </div>
    `
    );
  });
});
