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
var import_index = __toESM(require("./index"));
const { getEncoding } = require("./utils/text");
const { record } = require("test-helpers");
describe("Resource", () => {
  const recorder = record("resource-test");
  beforeAll(recorder.before);
  afterAll(recorder.after);
  describe("create(url)", () => {
    it("fetches the page and returns a cheerio object", async () => {
      const url = "http://theconcourse.deadspin.com/1786177057";
      const $ = await import_index.default.create(url);
      import_assert.default.equal(typeof $, "function");
    });
    it("returns an error message if the url is malformed", async () => {
      const url = "http://nytimes.com/500";
      const error = await import_index.default.create(url);
      (0, import_assert.default)(/instructed to reject non-200/i.test(error.message));
    });
    it("fetches with different encoding on body", async () => {
      const url = "http://www.playnation.de/spiele-news/kojima-productions/hideo-kojima-reflektiert-ueber-seinen-werdegang-bei-konami-id68950.html";
      const $ = await import_index.default.create(url);
      const metaContentType = $("meta[http-equiv=content-type]").attr("value");
      import_assert.default.equal(getEncoding(metaContentType), "iso-8859-1");
      const encodedU = /&#xFC;/g;
      import_assert.default.equal(encodedU.test($.html()), true);
      import_assert.default.equal(typeof $, "function");
    });
    it("fetches with different encoding and case insensitive regex", async () => {
      const url = "https://www.finam.ru/analysis/newsitem/putin-nagradil-grefa-ordenom-20190208-203615/";
      const $ = await import_index.default.create(url);
      const metaContentType = $("meta[http-equiv=content-type i]").attr(
        "value"
      );
      import_assert.default.equal(getEncoding(metaContentType), "windows-1251");
      const badEncodingRe = /&#xFFFD;/g;
      import_assert.default.equal(badEncodingRe.test($.html()), false);
      import_assert.default.equal(typeof $, "function");
    });
    it("fetches with different encoding and HTML5 charset tag", async () => {
      const url = "https://www.idnes.cz/fotbal/prvni-liga/fotbalova-liga-8-kolo-slovan-liberec-slovacko.A170925_173123_fotbal_min";
      const $ = await import_index.default.create(url);
      const metaContentType = $("meta[charset]").attr("charset");
      import_assert.default.equal(getEncoding(metaContentType), "windows-1250");
      const badEncodingRe = /&#xFFFD;/g;
      import_assert.default.equal(badEncodingRe.test($.html()), false);
      import_assert.default.equal(typeof $, "function");
    });
    it("handles special encoding", async () => {
      const url = "http://www.elmundo.es/opinion/2016/11/19/582f476846163fc65a8b4578.html";
      const $ = await import_index.default.create(url);
      const badEncodingRe = /�/g;
      import_assert.default.equal(badEncodingRe.test($.html()), false);
      import_assert.default.equal(typeof $, "function");
    });
    it("doesnt mangle non-ascii characters in prefetched response", async () => {
      const url = "https://www.gruene.de/themen/digitalisierung";
      const prefetched = '<!DOCTYPE html><html lang="de"><head><meta charSet="UTF-8"/><meta http-equiv="x-ua-compatible" content="ie=edge"/><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/></head><body><div id="___gatsby"><h1 class="styles-module--headline--niWjO">Wir gestalten die Digitalisierung</h1><p>Wir Gr\xFCne k\xE4mpfen f\xFCr ein offenes, gemeinwohlorientiertes Netz. Wir wollen den digitalen Wandel gerecht gestalten und setzen uns f\xFCr Verantwortung, Freiheit und Recht im Netz ein. Netzpolitik und Digitalisierung sind zentrale politische Querschnittsaufgaben f\xFCr eine moderne Gesellschaft. Im Mittelpunkt stehen f\xFCr uns eine zukunftsf\xE4hige digitale Infrastruktur, der freie und gleichberechtigte Zugang zum Netz f\xFCr alle, der Schutz unserer Privatsph\xE4re und pers\xF6nlichen Daten, sowie eine modernisierte  Verwaltung.</p></div></body></html>';
      const $ = await import_index.default.create(url, prefetched);
      import_assert.default.equal(/Gr&#xFC;ne/.test($.html()), true);
      import_assert.default.equal(/&#xFFFD;/.test($.html()), false);
    });
  });
  describe("generateDoc({ body, response })", () => {
    it("throws an error if the content is not text", () => {
      const response = {
        headers: {
          "content-type": "foo"
        }
      };
      const body = "";
      import_assert.default.throws(() => {
        import_index.default.generateDoc({ body, response });
      }, /content does not appear to be text/i);
    });
    it("throws an error if the response has no Content-Type header", () => {
      const response = {
        headers: {}
      };
      const body = "";
      import_assert.default.throws(
        () => {
          import_index.default.generateDoc({ body, response });
        },
        (err) => err instanceof Error && /content does not appear to be text/i.test(err)
      );
    });
    it("throws an error if the content has no children", () => {
      if (!import_cheerio.default.browser) {
        const response = {
          headers: {
            "content-type": "html"
          }
        };
        const body = "";
        import_assert.default.throws(() => {
          import_index.default.generateDoc({ body, response });
        }, /no children/i);
      }
    });
  });
});
