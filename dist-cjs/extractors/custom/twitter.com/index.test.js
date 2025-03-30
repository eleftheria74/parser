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
describe("TwitterExtractor", () => {
  it("works with a feature story", async () => {
    const html = fs.readFileSync("./fixtures/twitter.com.html");
    const uri = "https://twitter.com/KingBeyonceStan/status/745276948213968896";
    const { title, author, date_published } = await import_mercury.default.parse(uri, {
      html
    });
    import_assert.default.equal(title, "Lina Morgana on Twitter");
    import_assert.default.equal(author, "@KingBeyonceStan");
    import_assert.default.equal(date_published, "2016-06-21T15:27:25.000Z");
  });
});
