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
var import_set_attrs = __toESM(require("./set-attrs"));
const { MockDomNode } = require("test-helpers");
describe("setAttrs(node, attrs)", () => {
  it("sets attrs for a raw jquery node", () => {
    const attrs = {
      class: "baz"
    };
    const postAttrs = [
      {
        name: "class",
        value: "baz"
      }
    ];
    const domNode = new MockDomNode();
    const node = (0, import_set_attrs.default)(domNode, attrs);
    import_assert.default.deepEqual(node.attributes, postAttrs);
  });
  it("sets attrs for a raw cheerio node", () => {
    const cheerioNode = {
      attribs: {
        class: "foo bar",
        id: "baz bat"
      }
    };
    const attrs = {
      class: "baz",
      id: "bar"
    };
    const node = (0, import_set_attrs.default)(cheerioNode, attrs);
    import_assert.default.deepEqual(node.attribs, attrs);
  });
});
