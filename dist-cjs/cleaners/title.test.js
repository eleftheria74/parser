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
const { cleanTitle } = require("./index");
describe("cleanTitle(title, { url, $ })", () => {
  it("only uses h1 if there is only one on the page", () => {
    const title = "Too Short";
    const $ = import_cheerio.default.load(`
      <div>
        <h1>This Is the Real Title</h1>
        <h1>This Is the Real Title</h1>
      </div>
    `);
    import_assert.default.equal(cleanTitle(title, { url: "", $ }), title);
  });
  it("removes HTML tags from titles", () => {
    const $ = import_cheerio.default.load(
      "<div><h1>This Is the <em>Real</em> Title</h1></div>"
    );
    const title = $("h1").html();
    import_assert.default.equal(cleanTitle(title, { url: "", $ }), "This Is the Real Title");
  });
  it("trims extraneous spaces", () => {
    const title = " This Is a Great Title That You'll Love ";
    const $ = import_cheerio.default.load(
      "<div><h1>This Is the <em>Real</em> Title</h1></div>"
    );
    import_assert.default.equal(cleanTitle(title, { url: "", $ }), title.trim());
  });
});
