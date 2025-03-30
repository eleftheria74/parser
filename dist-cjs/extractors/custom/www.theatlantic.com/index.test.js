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
var import_url = __toESM(require("url"));
var import_cheerio = __toESM(require("cheerio"));
var import_mercury = __toESM(require("mercury"));
var import_get_extractor = __toESM(require("extractors/get-extractor"));
const fs = require("fs");
describe("AtlanticExtractor", () => {
  describe("initial test case", () => {
    let result;
    let url;
    beforeAll(() => {
      url = "http://www.theatlantic.com/technology/archive/2016/09/why-new-yorkers-got-a-push-alert-about-a-manhunt/500591/";
      const html = fs.readFileSync("./fixtures/www.theatlantic.com.html");
      result = import_mercury.default.parse(url, { html, fallback: false });
    });
    it("is selected properly", async () => {
      const extractor = (0, import_get_extractor.default)(url);
      import_assert.default.equal(extractor.domain, import_url.default.parse(url).hostname);
    });
    it("works with a starter story", async () => {
      const { content, title, author, dek, lead_image_url } = await result;
      const $ = import_cheerio.default.load(content);
      const text = $("*").first().text().trim().slice(0, 20);
      import_assert.default.equal(
        title,
        "Why New Yorkers Received a Push Alert About a Manhunt"
      );
      import_assert.default.equal(author, "Kaveh Waddell");
      import_assert.default.equal(text, "The city has never b");
      import_assert.default.equal(
        dek,
        "The city has never before used the emergency system the way it did Monday morning."
      );
      import_assert.default.equal(
        lead_image_url,
        "https://cdn.theatlantic.com/thumbor/wSPiU9kRoAfi5S26nCy3rw5-P78=/0x102:4246x2313/1200x625/media/img/mt/2016/09/RTSO9RP/original.jpg"
      );
    });
  });
});
