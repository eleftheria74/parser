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
describe("Scoring utils", () => {
  describe("scoreParagraph(node)", () => {
    it("returns 0 if text is less than 25 chars", () => {
      const $ = import_cheerio.default.load("<p><em>Foo</em> bar</p>");
      const score = (0, import_index.scoreParagraph)($("p").first());
      import_assert.default.equal(score, 0);
    });
    it("returns 1 if text is > 25 chars and has 0 commas", () => {
      const $ = import_cheerio.default.load("<p>Lorem ipsum dolor sit amet</p>");
      const score = (0, import_index.scoreParagraph)($("p").first());
      import_assert.default.equal(score, 1);
    });
    it("returns 3 if text is > 25 chars and has 2 commas", () => {
      const $ = import_cheerio.default.load("<p>Lorem ipsum, dolor sit, amet</p>");
      const score = (0, import_index.scoreParagraph)($("p").first());
      import_assert.default.equal(score, 3);
    });
    it("returns 19 if text has 15 commas, ~600 chars", () => {
      const $ = import_cheerio.default.load(
        `<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>`
      );
      const score = (0, import_index.scoreParagraph)($("p").first());
      import_assert.default.equal(score, 19);
    });
  });
});
