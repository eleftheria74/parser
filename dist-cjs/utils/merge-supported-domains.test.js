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
var import_merge_supported_domains = __toESM(require("./merge-supported-domains"));
describe("mergeSupportedDomains(extractor, domains)", () => {
  it("returns an object w/domains as keys and extractor as value", () => {
    const extractor = {
      domain: "foo.com",
      supportedDomains: ["example.com"]
    };
    const expected = {
      "foo.com": extractor,
      "example.com": extractor
    };
    const result = (0, import_merge_supported_domains.default)(extractor);
    import_assert.default.deepEqual(result, expected);
  });
  it("returns an object w/single domain if no supportedDomains", () => {
    const extractor = {
      domain: "foo.com"
    };
    const expected = {
      "foo.com": extractor
    };
    const result = (0, import_merge_supported_domains.default)(extractor);
    import_assert.default.deepEqual(result, expected);
  });
});
