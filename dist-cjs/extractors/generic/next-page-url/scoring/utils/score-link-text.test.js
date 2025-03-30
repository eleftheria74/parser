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
var import_score_link_text = __toESM(require("./score-link-text"));
describe("scoreLinkText(linkText)", () => {
  it("returns 8 if link contains the num 2", () => {
    import_assert.default.equal((0, import_score_link_text.default)("2", 0), 8);
  });
  it("returns 5 if link contains the num 5", () => {
    import_assert.default.equal((0, import_score_link_text.default)("5", 0), 5);
  });
  it("returns -30 if link contains the number 1", () => {
    import_assert.default.equal((0, import_score_link_text.default)("1", 0), -30);
  });
  it("penalizes -50 if pageNum is >= link text as num", () => {
    import_assert.default.equal((0, import_score_link_text.default)("4", 5), -44);
  });
});
