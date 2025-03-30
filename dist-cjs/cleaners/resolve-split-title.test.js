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
const { resolveSplitTitle } = require("./index");
describe("resolveSplitTitle(text)", () => {
  it("does nothing if title not splittable", () => {
    const title = "This Is a Normal Title";
    import_assert.default.equal(resolveSplitTitle(title), title);
  });
  it("extracts titles from breadcrumb-like titles", () => {
    const title = "The Best Gadgets on Earth : Bits : Blogs : NYTimes.com";
    import_assert.default.equal(resolveSplitTitle(title), "The Best Gadgets on Earth ");
  });
  it("cleans domains from titles at the front", () => {
    const title = "NYTimes - The Best Gadgets on Earth";
    const url = "https://www.nytimes.com/bits/blog/etc/";
    import_assert.default.equal(resolveSplitTitle(title, url), "The Best Gadgets on Earth");
  });
  it("cleans domains from titles at the back", () => {
    const title = "The Best Gadgets on Earth | NYTimes";
    const url = "https://www.nytimes.com/bits/blog/etc/";
    import_assert.default.equal(resolveSplitTitle(title, url), "The Best Gadgets on Earth");
  });
});
