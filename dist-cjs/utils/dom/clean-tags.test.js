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
const { assertClean } = require("test-helpers");
const { cleanTags } = require("./index");
describe("cleanTags($)", () => {
  it("drops a matching node with a negative score", () => {
    const $ = import_cheerio.default.load(`
      <div score="5">
        <p>What do you think?</p>
        <p>
          <ul score="-10">
            <li>Foo</li>
            <li>Bar</li>
          </ul>
        </p>
        <p>What do you think?</p>
      </div>
    `);
    const result = cleanTags($("*").first(), $);
    assertClean(
      result.html(),
      import_cheerio.default.browser ? `
          <div score="5">
            <p>What do you think?</p>
            <p>
            </p>
            <p></p>
            <p>What do you think?</p>
          </div>
        ` : `
          <div score="5">
            <p>What do you think?</p>
            <p>
            </p>
            <p>What do you think?</p>
          </div>
        `
    );
  });
  it("removes a node with too many inputs", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <div>
          <p>What is your name?</p>
          <input type="text"></input>
          <p>What is your name?</p>
          <input type="text"></input>
          <p>What is your name?</p>
          <input type="text"></input>
        </div>
        <p>What do you think?</p>
      </div>
    `);
    const result = cleanTags($("*").first(), $);
    $("[score]").each((i, e) => $(e).removeAttr("score"));
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });
  it("removes a div with no images and very little text", () => {
    const $ = import_cheerio.default.load(`
      <div>
        <p>What do you think?</p>
        <div>
          <p>Keep this one</p>
          <img src="asdf" />
        </div>
        <div>
          <p>Lose this one</p>
        </div>
      </div>
    `);
    const result = cleanTags($("*").first(), $);
    $("[score]").each((i, e) => $(e).removeAttr("score"));
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <div>
          <p>Keep this one</p>
          <img src="asdf">
        </div>
      </div>
    `
    );
  });
  it("removes a node with a link density that is too high", () => {
    const $ = import_cheerio.default.load(`
      <div score="0">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
        <ul score="20">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `);
    const result = cleanTags($("*").first(), $);
    $("[score]").each((i, e) => $(e).removeAttr("score"));
    assertClean(
      result.html(),
      `
      <div>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
      </div>
    `
    );
  });
  it("removes a node with a good score but link density > 0.5", () => {
    const $ = import_cheerio.default.load(`
      <div score="0">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
        <ul score="20">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `);
    const result = cleanTags($("*").first(), $);
    $("[score]").each((i, e) => $(e).removeAttr("score"));
    assertClean(
      result.html(),
      `
      <div>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
      </div>
    `
    );
  });
  it("keeps node with a good score but link density > 0.5 if preceding text ends in colon", () => {
    const html = `
      <div score="40">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <p>Now read these links: </p>
        <ul score="30">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `;
    const $ = import_cheerio.default.load(html);
    const result = cleanTags($("*").first(), $);
    assertClean(result.html(), html);
  });
  it("keeps anything with a class of entry-content-asset", () => {
    const html = `
      <div score="100">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul score="20" class="entry-content-asset">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `;
    const $ = import_cheerio.default.load(html);
    const result = cleanTags($("*").first(), $);
    assertClean(result.html(), html);
  });
});
