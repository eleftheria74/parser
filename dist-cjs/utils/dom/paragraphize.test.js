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
var import_test_helpers = require("test-helpers");
var import_index = require("./index");
describe("Generic Extractor Utils", () => {
  describe("paragraphize(node)", () => {
    it("conversts a BR into P and moves inline contents to P tag after current parent", () => {
      const $ = import_cheerio.default.load(`
        <p>
          Here is some text
          <br />
          Here is more text
          <span>And also this</span>
        </p>
      `);
      const node = $("br").get(0);
      const result = (0, import_index.paragraphize)(node, $, true).html();
      import_assert.default.equal(
        (0, import_test_helpers.clean)(result),
        (0, import_test_helpers.clean)(`
          <p>
            Here is some text
          <p>
            Here is more text
            <span>And also this</span>
          </p></p>
        `)
      );
    });
    it("converts a BR into P and stops when block element hit", () => {
      const $ = import_cheerio.default.load(`
        <p>
          Here is some text
          <br />
          Here is more text
          <div>And also this</div>
        </p>
      `);
      const node = $("br").get(0);
      const result = (0, import_index.paragraphize)(node, $, true).html();
      if ($.browser) {
        const html = "<p> Here is some text <p> Here is more text </p></p><div>And also this</div> <p></p>";
        import_assert.default.equal((0, import_test_helpers.clean)(result), html);
      } else {
        import_assert.default.equal(
          (0, import_test_helpers.clean)(result),
          (0, import_test_helpers.clean)(`
            <p>
              Here is some text
            <p>
              Here is more text
            </p><div>And also this</div>
            </p>
          `)
        );
      }
    });
  });
});
