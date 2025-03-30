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
var import_mercury = __toESM(require("mercury"));
const fs = require("fs");
describe("NYMagExtractor", () => {
  it("works with a feature story", async () => {
    const html = fs.readFileSync("./fixtures/nymag.com.html");
    const uri = "http://nymag.com/daily/intelligencer/2016/09/how-fox-news-women-took-down-roger-ailes.html";
    const { dek, title, author } = await import_mercury.default.parse(uri, html);
    const actualDek = "How Fox News women took down the most powerful, and predatory, man in media.";
    import_assert.default.equal(dek, actualDek);
    import_assert.default.equal(title, "The Revenge of Roger\u2019s Angels");
    import_assert.default.equal(author, "Gabriel Sherman");
  });
});
