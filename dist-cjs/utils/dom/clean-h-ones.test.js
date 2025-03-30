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
const { cleanHOnes } = require("./index");
describe("cleanHOnes($)", () => {
  it("removes H1s if there are less than 3 of them", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <h1>Look at this!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
      </div>
    `);
    const result = cleanHOnes($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("converts H1s to H2s if there are 3 or more of them", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <h1>Look at this!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
      </div>
    `);
    const result = cleanHOnes($("*").first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <h2>Look at this!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
      </div>
    `
    );
  });
});
