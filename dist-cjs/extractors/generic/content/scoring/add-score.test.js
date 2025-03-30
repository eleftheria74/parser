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
const { addScore, getScore } = require("./index");
describe("Scoring utils", () => {
  describe("addScore(node, $, amount)", () => {
    it("adds the specified amount to a node's score", () => {
      const $ = import_cheerio.default.load('<p score="25">Foo</p>');
      const $node = $("p").first();
      addScore($node, $, 25);
      import_assert.default.equal(getScore($node), 50);
    });
    it("adds score if score not yet set (assumes score is 0)", () => {
      const $ = import_cheerio.default.load("<p>Foo</p>");
      const $node = $("p").first();
      addScore($node, $, 25);
      import_assert.default.equal(getScore($node), 25);
    });
  });
});
