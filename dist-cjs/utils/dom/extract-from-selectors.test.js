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
var import_extract_from_selectors = __toESM(require("./extract-from-selectors"));
describe("extractFromSelectors($, selectors, maxChildren, textOnly)", () => {
  it("extracts an arbitrary node by selector", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <div class="author">Adam</div>
      </html>
    `);
    import_assert.default.equal((0, import_extract_from_selectors.default)($, [".author"]), "Adam");
  });
  it("ignores comments", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <div class="comments-section">
          <div class="author">Adam</div>
        </div>
      </html>`);
    import_assert.default.equal((0, import_extract_from_selectors.default)($, [".author"]), null);
  });
  it("skips a selector if it matches multiple nodes", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <div>
          <div class="author">Adam</div>
          <div class="author">Adam</div>
        </div>
      </html>
    `);
    import_assert.default.equal((0, import_extract_from_selectors.default)($, [".author"]), null);
  });
  it("skips a node with too many children", () => {
    const $ = import_cheerio.default.load(`
      <html>
        <div>
          <div class="author">
            <span>Adam</span>
            <span>Pash</span>
          </div>
        </div>
      </html>
    `);
    import_assert.default.equal((0, import_extract_from_selectors.default)($, [".author"]), null);
  });
});
