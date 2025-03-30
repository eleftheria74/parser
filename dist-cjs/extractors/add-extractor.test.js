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
var import_add_extractor = __toESM(require("./add-extractor"));
describe("addExtractor(extractor)", () => {
  it("can add multiple custom extractors", () => {
    (0, import_add_extractor.default)({ domain: "www.site1.com" });
    (0, import_add_extractor.default)({ domain: "www.site2.com" });
    const result = (0, import_add_extractor.default)({ domain: "www.site3.com" });
    import_assert.default.equal(Object.keys(result).length, 3);
  });
  it("returns error if an extractor is not provided", () => {
    const result = (0, import_add_extractor.default)();
    import_assert.default.equal(result.error, true);
  });
  it("returns error if a domain key is not included within the custom extractor", () => {
    const result = (0, import_add_extractor.default)({ test: "abc" });
    import_assert.default.equal(result.error, true);
  });
});
