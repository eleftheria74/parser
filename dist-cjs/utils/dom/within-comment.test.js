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
var import_cheerio = __toESM(require("cheerio"));
var import_assert = __toESM(require("assert"));
var import_within_comment = __toESM(require("./within-comment"));
describe("withinComment(node)", () => {
  it("returns false if its parent is not a comment", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <div>
          <div class="author">Adam</div>
        </div>
      </div>
    `);
    import_assert.default.equal((0, import_within_comment.default)($(".author").first()), false);
  });
  it("returns true if its parent has a class of comment", () => {
    const $ = import_cheerio.default.load(`
      <div class="comments">
        <div>
          <div class="author">Adam</div>
        </div>
      </div>
    `);
    import_assert.default.equal((0, import_within_comment.default)($(".author").first()), true);
  });
  it("returns true if its parent has an id of comment", () => {
    const $ = import_cheerio.default.load(`
      <div id="comment">
        <div>
          <div class="author">Adam</div>
        </div>
      </div>
    `);
    import_assert.default.equal((0, import_within_comment.default)($(".author").first()), true);
  });
});
