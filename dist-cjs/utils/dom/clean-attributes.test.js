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
const { cleanAttributes } = require("./index");
describe("cleanAttributes($)", () => {
  it("removes style attributes from nodes", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p style="color: red;">What do you think?</p>
      </div>
    `);
    const result = cleanAttributes($("*").first(), $);
    assertClean(
      $.html(result),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("removes align attributes from nodes", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p style="color: red;" align="center">What do you think?</p>
      </div>
    `);
    const result = cleanAttributes($("*").first(), $);
    assertClean(
      $.html(result),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
});
