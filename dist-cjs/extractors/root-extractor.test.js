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
var import_root_extractor = __toESM(require("./root-extractor"));
const { assertClean } = require("test-helpers");
const { NYMagExtractor } = require("./custom/nymag.com");
const fs = require("fs");
describe("RootExtractor", () => {
  it("only returns what the custom parser gives it if fallback is disabled", () => {
    const fullUrl = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const $ = import_cheerio.default.load(html);
    const { url } = import_root_extractor.default.extract(NYMagExtractor, {
      url: fullUrl,
      html,
      $,
      metaCache: [],
      fallback: false
    });
    import_assert.default.equal(url, null);
  });
});
describe("cleanBySelectors($content, $, { clean })", () => {
  it("removes provided selectors from the content", () => {
    const opts = { clean: [".ad", ".share"] };
    const html = `
      <div>
        <div class="body">
          <div class="share">Share this on twitter plz</div>
          <p>This is some good content</p>
          <div class="ad">Advertisement!</div>
        </div>
      </div>
    `;
    const $ = import_cheerio.default.load(html);
    let $content = $(".body");
    $content = (0, import_root_extractor.cleanBySelectors)($content, $, opts);
    import_assert.default.equal($content.find(".ad").length, 0);
    import_assert.default.equal($content.find(".share").length, 0);
  });
});
describe("transformElements($content, $, { transforms })", () => {
  it("performs a simple transformation on matched elements", () => {
    const html = `
      <div>
        <div class="body">
          <h1>WOW BIG TITLE</h1>
          <p>Here are some words</p>
          <h1>WOW BIG TITLE</h1>
        </div>
      </div>
    `;
    const opts = {
      transforms: { h1: "h2" }
    };
    const $ = import_cheerio.default.load(html);
    let $content = $(".body");
    const after = `
      <div class="body">
        <h2>WOW BIG TITLE</h2>
        <p>Here are some words</p>
        <h2>WOW BIG TITLE</h2>
      </div>
    `;
    $content = (0, import_root_extractor.transformElements)($content, $, opts);
    assertClean($.html($content), after);
  });
  it("performs a complex transformation on matched elements", () => {
    const html = `
      <div>
        <div class="body">
          <noscript>
            <img src="/img.jpg" />
          </noscript>
          <noscript>
            Something else
          </noscript>
          <p>Here are some words</p>
        </div>
      </div>
    `;
    const opts = {
      transforms: {
        noscript: ($node, $2) => {
          const $children = $2.browser ? $2($node.text()) : $node.children();
          if ($children.length === 1 && $children.get(0) !== void 0 && $children.get(0).tagName.toLowerCase() === "img") {
            return "figure";
          }
          return null;
        }
      }
    };
    const $ = import_cheerio.default.load(html);
    let $content = $(".body");
    const after = `
      <div class="body">
        <figure>
          <img src="/img.jpg">
        </figure>
        <noscript>
          Something else
        </noscript>
        <p>Here are some words</p>
      </div>
    `;
    $content = (0, import_root_extractor.transformElements)($content, $, opts);
    assertClean($.html($content), after);
  });
});
describe("select(opts)", () => {
  it("returns a node's text with a simple selector", () => {
    const html = `
      <div><div class="author">Bob</div></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "author",
      $,
      extractionOpts: {
        selectors: [".author"]
      }
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal(result, "Bob");
  });
  it("returns a node's attr with an attr selector", () => {
    const html = `
      <div>
        <time datetime="2016-09-07T05:07:59-04:00">
          September 7, 2016
        </time>
      </div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "date_published",
      $,
      extractionOpts: {
        selectors: [["time", "datetime"]]
      }
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal(result, "2016-09-07T09:07:59.000Z");
  });
  it("returns a node's html when it is a content selector", () => {
    const html = `
      <div><div class="content-is-here"><p>Wow what a piece of content</p></div></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "content",
      $,
      extractionOpts: {
        selectors: [".content-is-here"]
      },
      extractHtml: true
    };
    const result = (0, import_root_extractor.select)(opts);
    assertClean(result, html);
  });
  it("handles multiple matches when the content selector is an array", () => {
    const html = `
      <div><div><img class="lead-image" src="#" /><div class="content-is-here"><p>Wow what a piece of content</p></div></div></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "content",
      $,
      extractionOpts: {
        selectors: [[".lead-image", ".content-is-here"]]
      },
      extractHtml: true
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal($(result).find("img.lead-image").length, 1);
    import_assert.default.equal($(result).find(".content-is-here").length, 1);
  });
  it("skips multi-match if not all selectors are present", () => {
    const html = `
      <div><div><img class="lead-image" src="#" /><div class="content-is-here"><p>Wow what a piece of content</p></div></div></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "content",
      $,
      extractionOpts: {
        selectors: [[".lead-image", ".content-is-here", ".foo"]]
      },
      extractHtml: true
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal(result, null);
  });
  it("returns an array of results if allowMultiple is true", () => {
    const html = `
      <div><div><ul><li class="item">One</li><li class="item">Two</li></ul></div></div>
      `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "items",
      $,
      extractionOpts: {
        selectors: [".item"],
        allowMultiple: true
      },
      extractHtml: true
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal(result.length, 2);
    import_assert.default.deepEqual(result, [
      '<li class="item">One</li>',
      '<li class="item">Two</li>'
    ]);
  });
  it("makes links absolute in extended types when extracting HTML", () => {
    const html = `
      <div><p><a class="linky" href="/foo">Bar</a></p></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "links",
      $,
      url: "http://example.com",
      extractionOpts: {
        selectors: [".linky"]
      },
      extractHtml: true
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.equal(
      result,
      '<div><a class="linky" href="http://example.com/foo">Bar</a></div>'
    );
  });
  it("makes links absolute in extended types when extracting attrs", () => {
    const html = `
      <div><p><a class="linky" href="/foo">Bar</a><a class="linky" href="/bar">Baz</a></p></div>
    `;
    const $ = import_cheerio.default.load(html);
    const opts = {
      type: "links",
      $,
      url: "http://example.com",
      extractionOpts: {
        selectors: [[".linky", "href"]],
        allowMultiple: true
      }
    };
    const result = (0, import_root_extractor.select)(opts);
    import_assert.default.deepEqual(result, [
      "http://example.com/foo",
      "http://example.com/bar"
    ]);
  });
});
