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
var import_get_encoding = __toESM(require("./get-encoding"));
describe("getEncoding(str)", () => {
  if (import_cheerio.default.browser)
    return;
  it("returns the encoding as a string", () => {
    const contentType = "text/html; charset=iso-8859-15";
    import_assert.default.equal((0, import_get_encoding.default)(contentType), "iso-8859-15");
  });
  it("returns utf-8 as a default if no encoding found", () => {
    const contentType = "text/html";
    import_assert.default.equal((0, import_get_encoding.default)(contentType), "utf-8");
  });
  it("returns utf-8 if there is an invalid encoding", () => {
    const contentType = "text/html; charset=fake-charset";
    import_assert.default.equal((0, import_get_encoding.default)(contentType), "utf-8");
  });
});
