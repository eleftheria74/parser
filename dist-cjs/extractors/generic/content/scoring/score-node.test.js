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
const { scoreNode, scoreParagraph } = require("./index");
describe("scoreNode(node)", () => {
  it("scores P, LI, SPAN, and PRE using scoreParagraph", () => {
    const $ = import_cheerio.default.load("<p><em>Foo</em> bar</p>");
    const node = $("p").first();
    const score = scoreNode(node);
    const pScore = scoreParagraph(node);
    import_assert.default.equal(score, pScore);
    import_assert.default.equal(score, 0);
  });
  it("scores P, LI, SPAN, and PRE using scoreParagraph", () => {
    const $ = import_cheerio.default.load(`
      <p>Lorem ipsum dolor sit amet</p>
    `);
    const node = $("p").first();
    const score = scoreNode(node);
    const pScore = scoreParagraph(node);
    import_assert.default.equal(score, pScore);
    import_assert.default.equal(score, 1);
  });
  it("scores P, LI, SPAN, and PRE using scoreParagraph", () => {
    const $ = import_cheerio.default.load(`
      <p>Lorem ipsum, dolor sit, amet</p>
    `);
    const node = $("p").first();
    const score = scoreNode(node);
    const pScore = scoreParagraph(node);
    import_assert.default.equal(score, pScore);
    import_assert.default.equal(score, 3);
  });
  it("scores P, LI, SPAN, and PRE using scoreParagraph", () => {
    const $ = import_cheerio.default.load(`
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
    `);
    const node = $("p").first();
    const score = scoreNode(node);
    const pScore = scoreParagraph(node);
    import_assert.default.equal(score, pScore);
    import_assert.default.equal(score, 19);
  });
  it("scores divs with 5", () => {
    const $ = import_cheerio.default.load(`
      <div>Lorem ipsum, dolor sit, amet</div>
    `);
    const node = $("div").first();
    const score = scoreNode(node);
    import_assert.default.equal(score, 5);
  });
  it("scores the blockquote family with 3", () => {
    const $ = import_cheerio.default.load(`
      <blockquote>Lorem ipsum, dolor sit, amet</blockquote>
    `);
    const node = $("blockquote").first();
    const score = scoreNode(node);
    import_assert.default.equal(score, 3);
  });
  it("scores a form with negative 3", () => {
    const $ = import_cheerio.default.load(`
      <form><label>Lorem ipsum, dolor sit, amet</label></form>
    `);
    const node = $("form").first();
    const score = scoreNode(node);
    import_assert.default.equal(score, -3);
  });
  it("scores a TH element with negative 5", () => {
    const $ = import_cheerio.default.load(`
      <th>Lorem ipsum, dolor sit, amet</th>
    `);
    const node = $("th").first();
    const score = scoreNode(node);
    import_assert.default.equal(score, -5);
  });
});
