var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var test_helpers_exports = {};
__export(test_helpers_exports, {
  MockDomNode: () => MockDomNode
});
module.exports = __toCommonJS(test_helpers_exports);
const assert = require("assert");
const nock = require("nock");
const path = require("path");
const cheerio = require("cheerio");
function clean(string) {
  return string.trim().replace(/\r?\n|\r/g, "").replace(/\s+/g, " ");
}
function assertClean(a, b) {
  assert.equal(clean(a), clean(b));
}
function record(name, options = {}) {
  const test_folder = options.test_folder || ".";
  const fixtures_folder = options.fixtures_folder || "fixtures/nock";
  const fp = path.join(test_folder, fixtures_folder, `${name}.js`);
  let has_fixtures = !!process.env.NOCK_RECORD;
  return {
    before: () => {
      if (cheerio.browser)
        return;
      if (!has_fixtures) {
        try {
          require(`../${fp}`);
          has_fixtures = true;
        } catch (e) {
          nock.recorder.rec({
            dont_print: true
          });
        }
      } else {
        has_fixtures = false;
        nock.recorder.rec({
          dont_print: true
        });
      }
    },
    after: (done) => {
      if (!has_fixtures && !cheerio.browser) {
        has_fixtures = nock.recorder.play();
        console.log(
          `This is disabled for browser/node interop. To capture fixutres,
          open ${"`src/test-helpers.js`"} and uncomment lines 58 and 59 and
          the fs import at top of file.`
        );
      } else {
        done();
      }
    }
  };
}
class MockDomNode {
  constructor() {
    this.attributes = [
      {
        name: "class",
        value: "foo bar"
      }
    ];
  }
  setAttribute(key, val) {
    this.attributes.pop();
    this.attributes.push({ name: key, value: val });
  }
  removeAttribute() {
    this.attributes.pop();
  }
}
module.exports = {
  MockDomNode
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockDomNode
});
