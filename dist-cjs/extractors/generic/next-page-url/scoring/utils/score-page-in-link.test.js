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
var import_score_page_in_link = __toESM(require("./score-page-in-link"));
describe("scorePageInLink(pageNum, isWp)", () => {
  it("returns 50 if link contains a page num", () => {
    import_assert.default.equal((0, import_score_page_in_link.default)(1, false), 50);
  });
  it("returns 0 if link contains no page num", () => {
    import_assert.default.equal((0, import_score_page_in_link.default)(null, false), 0);
  });
  it("returns 0 if page is wordpress", () => {
    import_assert.default.equal((0, import_score_page_in_link.default)(10, true), 0);
  });
});
