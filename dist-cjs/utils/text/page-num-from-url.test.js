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
var import_page_num_from_url = __toESM(require("./page-num-from-url"));
describe("pageNumFromUrl(url)", () => {
  it("returns null if there is no page num in the url", () => {
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com"), null);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/?pg=102"), null);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/?page:102"), null);
  });
  it("returns a page num if one matches the url", () => {
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?page=1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?pg=1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?p=1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?paging=1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?pag=1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?pagination/1"), 1);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?paging/99"), 99);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?pa/99"), 99);
    import_assert.default.equal((0, import_page_num_from_url.default)("http://example.com/foo?p/99"), 99);
  });
});
