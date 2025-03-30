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
const { linkDensity } = require("./index");
describe("linkDensity($)", () => {
  it("returns 0.5 if half of the text is a link", () => {
    const $ = import_cheerio.default.load(`
      <div><p>Some text!</p><p><a href="">Some text!</a></p> </div>
    `);
    const density = linkDensity($("div").first(), $);
    import_assert.default.equal(density, 0.5);
  });
  it("returns 1 if all of the text is a link", () => {
    const $ = import_cheerio.default.load(`
      <div><p><a href="">Some text!</a></p></div>
    `);
    const density = linkDensity($("div").first(), $);
    import_assert.default.equal(density, 1);
  });
  it("returns 0 if there's no text", () => {
    const $ = import_cheerio.default.load(`
      <div><p><a href=""></a></p></div>
    `);
    const density = linkDensity($("div").first());
    import_assert.default.equal(density, 0);
  });
});
