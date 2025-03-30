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
var import_make_links_absolute = __toESM(require("./make-links-absolute"));
const { assertClean } = require("test-helpers");
describe("makeLinksAbsolute($)", () => {
  it("makes relative #hrefs absolute", () => {
    const $ = import_cheerio.default.load('<div><a href="#foo">bar</a></div>');
    const $content = $("*").first();
    const result = $.html((0, import_make_links_absolute.default)($content, $, "http://example.com"));
    assertClean(result, '<div><a href="http://example.com/#foo">bar</a></div>');
  });
  it("makes relative ./relative paths absolute", () => {
    const $ = import_cheerio.default.load('<div><a href="foo/bar">bar</a></div>');
    const $content = $("*").first();
    const result = $.html(
      (0, import_make_links_absolute.default)($content, $, "http://example.com/baz/bat")
    );
    assertClean(
      result,
      '<div><a href="http://example.com/baz/foo/bar">bar</a></div>'
    );
  });
  it("makes relative /root/paths absolute", () => {
    const $ = import_cheerio.default.load('<div><a href="/foo/bar">bar</a></div>');
    const $content = $("*").first();
    const result = $.html(
      (0, import_make_links_absolute.default)($content, $, "http://example.com/baz/bat")
    );
    assertClean(
      result,
      '<div><a href="http://example.com/foo/bar">bar</a></div>'
    );
  });
  it("makes relative srcs absolute", () => {
    const $ = import_cheerio.default.load('<div><img src="#foo"></div>');
    const $content = $("*").first();
    const result = $.html((0, import_make_links_absolute.default)($content, $, "http://example.com"));
    assertClean(result, '<div><img src="http://example.com/#foo"></div>');
  });
  describe("makes relative srcsets absolute", () => {
    it("handles invalid srcsets as per their invalid implementation", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <picture>
            <source srcset="assets/images/rhythm/076.jpg,assets/images/rhythm/076@2x.jpg 2x" media="(max-width: 450px)">
            <source srcset="assets/images/rhythm/120@2x.jpg 2x, assets/images/rhythm/120.jpg,assets/images/rhythm/120@3x.jpg 3x" media="(max-width: 900px)">
            <source srcset="assets/images/rhythm/240.jpg,assets/images/rhythm/240@2x.jpg 2x,assets/images/rhythm/240@3x.jpg 3x" media="(min-width: 901px)">
            <img src="assets/images/rhythm/120.jpg" alt="Vertical and horizontal rhythm">
          </picture>
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `
          <div>
            <picture>
              <source srcset="http://example.com/assets/images/rhythm/076.jpg,assets/images/rhythm/076@2x.jpg 2x" media="(max-width: 450px)">
              <source srcset="http://example.com/assets/images/rhythm/120@2x.jpg 2x, http://example.com/assets/images/rhythm/120.jpg,assets/images/rhythm/120@3x.jpg 3x" media="(max-width: 900px)">
              <source srcset="http://example.com/assets/images/rhythm/240.jpg,assets/images/rhythm/240@2x.jpg 2x, http://example.com/assets/images/rhythm/240@3x.jpg 3x" media="(min-width: 901px)">
              <img src="http://example.com/assets/images/rhythm/120.jpg" alt="Vertical and horizontal rhythm">
            </picture>
          </div>
        `
      );
    });
    it("does nothing when the srcset is empty or just whitespace", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <picture>
            <source srcset="" media="(max-width: 450px)">
            <source srcset=" ">
            <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
          </picture>
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `<div>
        <picture>
          <source srcset="" media="(max-width: 450px)">
          <source srcset=" ">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });
    it("handles comma separated (with whitespace) srcset files with device-pixel-ratio descriptors", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <picture>
            <source srcset="assets/images/rhythm/076.jpg 2x, assets/images/rhythm/076.jpg" media="(max-width: 450px)">
            <source srcset="assets/images/rhythm/076@2x.jpg 2x, assets/images/rhythm/076.jpg">
            <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
          </picture>
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x, http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x, http://example.com/assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });
    it("handles comma separated (without whitespace) srcset files with device-pixel-ratio descriptors", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <picture>
            <source srcset="assets/images/rhythm/076.jpg 2x,assets/images/rhythm/076.jpg" media="(max-width: 450px)">
            <source srcset="assets/images/rhythm/076@2x.jpg 2x,assets/images/rhythm/076.jpg">
            <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
          </picture>
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `
          <div>
            <picture>
              <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x, http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
              <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x, http://example.com/assets/images/rhythm/076.jpg">
              <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
            </picture>
          </div>
      `
      );
    });
    it("handles comma separated (with whitespace) srcset files with width descriptors", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <img srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `
          <div>
            <img srcset="http://example.com/elva-fairy-320w.jpg 320w, http://example.com/elva-fairy-480w.jpg 480w, http://example.com/elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="http://example.com/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
          </div>
        `
      );
    });
    it("handles multiline comma separated srcset files with width descriptors", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <img srcset="elva-fairy-320w.jpg 320w,
            elva-fairy-480w.jpg 480w,
            elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "http://example.com")
      );
      assertClean(
        result,
        `
          <div>
            <img srcset="http://example.com/elva-fairy-320w.jpg 320w, http://example.com/elva-fairy-480w.jpg 480w, http://example.com/elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="http://example.com/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
          </div>
        `
      );
    });
    it("handles URLs that contain a comma", () => {
      const $ = import_cheerio.default.load(`
        <div>
          <picture><source media="(min-width: 768px)" srcset="cartoons/5bbfca021e40b62d6cc418ea/master/w_280,c_limit/181022_a22232.jpg, cartoons/5bbfca021e40b62d6cc418ea/master/w_560,c_limit/181022_a22232.jpg 2x"/><source srcset="cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg, cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,c_limit/181022_a22232.jpg 2x"/><img src="cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg" /></picture>
        </div>
      `);
      const $content = $("*").first();
      const result = $.html(
        (0, import_make_links_absolute.default)($content, $, "https://media.newyorker.com/")
      );
      assertClean(
        result,
        `
          <div>
            <picture><source media="(min-width: 768px)" srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_280,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_560,c_limit/181022_a22232.jpg 2x"><source srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,c_limit/181022_a22232.jpg 2x"><img src="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg"></picture>
          </div>
        `
      );
    });
  });
});
