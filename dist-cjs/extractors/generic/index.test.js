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
var import_moment = __toESM(require("moment"));
var import_index = __toESM(require("./index"));
const fs = require("fs");
describe("GenericExtractor", () => {
  describe("extract(opts)", () => {
    it("extracts this old LA Times article", () => {
      const html = fs.readFileSync(
        "./fixtures/www.latimes.com--old.html",
        "utf-8"
      );
      const { title, author, date_published, dek } = import_index.default.extract({
        url: "http://latimes.com",
        html,
        metaCache: []
      });
      const newDatePublished = (0, import_moment.default)(date_published).format();
      import_assert.default.equal(author, null);
      import_assert.default.equal(
        title,
        "California appears poised to be first to ban power-guzzling big-screen TVs"
      );
      import_assert.default.equal(newDatePublished.split("T")[0], "2009-10-14");
      import_assert.default.equal(dek, null);
    });
    it("extracts html and returns the article title", () => {
      const html = fs.readFileSync(
        "./fixtures/www.wired.com--other.html",
        "utf-8"
      );
      const { author, title, datePublished, dek } = import_index.default.extract({
        url: "http://wired.com",
        html,
        metaCache: []
      });
      import_assert.default.equal(author, "Eric Adams");
      import_assert.default.equal(
        title,
        "Airplane Tires Don\u2019t Explode on Landing Because They Are Pumped!"
      );
      import_assert.default.equal(datePublished, null);
      import_assert.default.equal(dek, null);
    });
  });
});
