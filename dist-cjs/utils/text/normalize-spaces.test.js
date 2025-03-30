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
var import_index = require("./index");
describe("normalizeSpaces(text)", () => {
  it("normalizes spaces from text", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
      </div>
    `);
    const result = (0, import_index.normalizeSpaces)(
      $("*").first().text()
    );
    import_assert.default.equal(result, "What do you think?");
  });
  it("preserves spaces in preformatted text blocks", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What   do  you    think?</p>
        <pre>  What     happens to        spaces?    </pre>
      </div>
    `);
    const result = (0, import_index.normalizeSpaces)($.html());
    import_assert.default.equal(
      result,
      "<div> <p>What do you think?</p> <pre>  What     happens to        spaces?    </pre> </div>"
    );
  });
});
