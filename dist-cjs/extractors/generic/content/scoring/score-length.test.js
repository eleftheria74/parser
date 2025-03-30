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
const { scoreLength } = require("./index");
describe("Scoring utils", () => {
  describe("scoreLength(textLength, tagName)", () => {
    it("returns 0 if length < 50 chars", () => {
      import_assert.default.equal(scoreLength(30), 0);
    });
    it("returns varying scores but maxes out at 3", () => {
      import_assert.default.equal(scoreLength(150), 1);
      import_assert.default.equal(scoreLength(199), 1.98);
      import_assert.default.equal(scoreLength(200), 2);
      import_assert.default.equal(scoreLength(250), 3);
      import_assert.default.equal(scoreLength(500), 3);
      import_assert.default.equal(scoreLength(1500), 3);
    });
  });
});
