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
var import_test_helpers = require("test-helpers");
var import_mercury = __toESM(require("./mercury"));
const fs = require("fs");
describe("Parser", () => {
  const recorder = (0, import_test_helpers.record)("mercury-test");
  beforeAll(recorder.before);
  afterAll(recorder.after);
  describe("parse(url)", () => {
    it("returns an error if a malformed url is passed", async () => {
      const error = await import_mercury.default.parse("foo.com");
      (0, import_assert.default)(/does not look like a valid URL/i.test(error.message));
    });
    it("does the whole thing", async () => {
      const result = await import_mercury.default.parse(
        "http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229"
      );
      import_assert.default.equal(typeof result, "object");
      import_assert.default.equal(result.content.indexOf('score="') === -1, true);
    });
    it("returns an error on non-200 responses", async () => {
      const error = await import_mercury.default.parse(
        "https://www.thekitchn.com/instant-pot-chicken-pesto-pasta-eating-instantly-267141"
      );
      (0, import_assert.default)(/instructed to reject non-200/i.test(error.message));
    });
    it("returns an error on invalid content types", async () => {
      const error = await import_mercury.default.parse(
        "https://upload.wikimedia.org/wikipedia/commons/5/52/Spacer.gif"
      );
      (0, import_assert.default)(/content-type for this resource/i.test(error.message));
    });
    it("does wikipedia", async () => {
      const result = await import_mercury.default.parse(
        "https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire"
      );
      import_assert.default.equal(typeof result, "object");
    });
    it("does washingtonpost", async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1e4;
      const result = await import_mercury.default.parse(
        "https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/"
      );
      import_assert.default.equal(typeof result, "object");
      import_assert.default.equal(result.total_pages, 1);
      import_assert.default.equal(
        result.url,
        "https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/"
      );
    });
    it("does the nyt", async () => {
      const result = await import_mercury.default.parse(
        "http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0"
      );
      import_assert.default.equal(typeof result, "object");
      import_assert.default.equal(result.total_pages, 1);
    });
    it("does ars pagination", async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1e4;
      const url = "https://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/";
      const result = await import_mercury.default.parse(url, { fetchAllPages: true });
      const { total_pages, rendered_pages } = result;
      import_assert.default.equal(total_pages, 3);
      import_assert.default.equal(rendered_pages, 3);
      import_assert.default.equal(result.next_page_url, `${url}2`);
    });
  });
  it("returns text content if text is passed as contentType", async () => {
    const url = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const { content } = await import_mercury.default.parse(url, { html, contentType: "text" });
    const htmlRe = /<[a-z][\s\S]*>/g;
    import_assert.default.equal(htmlRe.test(content), false);
  });
  it("returns markdown if markdown is passed as contentType", async () => {
    const url = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const { content } = await import_mercury.default.parse(url, {
      html,
      contentType: "markdown"
    });
    const htmlRe = /<[a-z][\s\S]*>/;
    const markdownRe = /\[[\w\s]+\]\(.*\)/;
    import_assert.default.equal(htmlRe.test(content), false);
    import_assert.default.equal(markdownRe.test(content), true);
  });
  it("returns custom elements if an extend object is passed", async () => {
    const url = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const { sites } = await import_mercury.default.parse(url, {
      html,
      extend: {
        sites: {
          selectors: ["a.site-name"],
          allowMultiple: true
        }
      }
    });
    import_assert.default.ok(sites);
    import_assert.default.equal(sites.length, 8);
    import_assert.default.equal(sites[0], "NYMag.com");
  });
  it("returns an array if a single element matches a custom extend", async () => {
    const url = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const { sites } = await import_mercury.default.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [["li:first-child a.site-name", "href"]],
          allowMultiple: true
        }
      }
    });
    import_assert.default.ok(sites);
    import_assert.default.equal(sites.length, 1);
  });
  it("returns custom attributes if an extend object is passed", async () => {
    const url = "http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html";
    const html = fs.readFileSync(
      "./src/extractors/custom/nymag.com/fixtures/test.html",
      "utf8"
    );
    const { sites } = await import_mercury.default.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [["a.site-name", "href"]],
          allowMultiple: true
        }
      }
    });
    import_assert.default.ok(sites);
    import_assert.default.equal(sites.length, 8);
    import_assert.default.equal(sites[1], "http://nymag.com/daily/intelligencer/");
  });
  it("is able to use custom extractors (with extension) added via api", async () => {
    const url = "https://www.sandiegouniontribune.com/business/growth-development/story/2019-08-27/sdsu-mission-valley-stadium-management-firm";
    const html = fs.readFileSync(
      "./fixtures/sandiegouniontribune.com.html",
      "utf8"
    );
    const customExtractor = {
      domain: "www.sandiegouniontribune.com",
      title: {
        selectors: ["h1", ".ArticlePage-headline"]
      },
      author: {
        selectors: [".ArticlePage-authorInfo-bio-name"]
      },
      content: {
        selectors: ["article"]
      },
      extend: {
        testContent: {
          selectors: [".ArticlePage-breadcrumbs a"]
        }
      }
    };
    import_mercury.default.addExtractor(customExtractor);
    const result = await import_mercury.default.parse(url, { html });
    import_assert.default.equal(typeof result, "object");
    import_assert.default.equal(result.author, "Jennifer Van Grove");
    import_assert.default.equal(result.domain, "www.sandiegouniontribune.com");
    import_assert.default.equal(result.total_pages, 1);
    import_assert.default.equal(result.testContent, "Growth & Development");
  });
});
