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
var import_convert_node_to = __toESM(require("./convert-node-to"));
describe("convertNodeTo(node, $)", () => {
  it("takes a node and converts it to a diff tag", () => {
    const $ = import_cheerio.default.load("<div>Should become a p</div>");
    const node = $("div").first();
    const result = (0, import_convert_node_to.default)(node, $).html();
    const after = "<p>Should become a p</p>";
    import_assert.default.equal(result, after);
  });
  it("retains attributes on conversion", () => {
    const $ = import_cheerio.default.load(
      '<span class="foo" score="100">Should keep its attrs</span>'
    );
    const node = $("span").first();
    const result = (0, import_convert_node_to.default)(node, $, "div").html();
    const after = '<div class="foo" score="100">Should keep its attrs</div>';
    import_assert.default.equal(result, after);
  });
  it("does nothing if node.get returns null", () => {
    const html = '<span class="foo" score="100">Should keep its attrs</span>';
    const $ = import_cheerio.default.load(html);
    const node = {
      get: () => null
    };
    const result = (0, import_convert_node_to.default)(node, $, "div").html();
    import_assert.default.equal(result, html);
  });
  it("handles noscript tags in the browser", () => {
    const $ = import_cheerio.default.load(
      '<noscript><img src="http://example.com" /></noscript>'
    );
    const node = $("noscript");
    const result = (0, import_convert_node_to.default)(node, $, "figure", "noscript").html();
    const resultHtml = '<figure><img src="http://example.com"></figure>';
    import_assert.default.equal(result, resultHtml);
  });
});
