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
var import_fetch_resource = __toESM(require("./fetch-resource"));
const { record } = require("test-helpers");
const { MAX_CONTENT_LENGTH } = require("./constants");
describe("fetchResource(url)", () => {
  const recorder = record("fetch-resource-test");
  beforeAll(recorder.before);
  afterAll(recorder.after);
  it("returns appropriate json for bad url", async () => {
    const url = "http://www.nytimes.com/500";
    const { error } = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(error, true);
  });
  it("passes custom headers in requests", async () => {
    const url = "https://postman-echo.com/headers";
    const parsedUrl = import_url.default.parse(url);
    const headers = {
      "my-custom-header": "Lorem ipsum dolor sit amet"
    };
    const result = await (0, import_fetch_resource.default)(url, parsedUrl, headers);
    const body = JSON.parse(result.body.toString());
    import_assert.default.equal(
      body.headers["my-custom-header"],
      "Lorem ipsum dolor sit amet"
    );
  });
  it("returns a buffer as its body", async () => {
    const url = "http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0";
    const result = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(typeof result.body, "object");
  });
  it("fetches nyt", async () => {
    const url = "http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0";
    const { response } = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(response.statusCode, 200);
  });
  it("fetches domains", async () => {
    const url = "http://theconcourse.deadspin.com/1786177057";
    const { response } = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(response.statusCode, 200);
  });
  it("fetches nyt", async () => {
    const url = "http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0";
    const { response } = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(response.statusCode, 200);
  });
  it("handles this gzip error", async () => {
    const url = "http://www.redcross.ca/blog/2016/11/photo-of-the-day--one-year-anniversary-of-the-end-of-ebola-in-sierra-leone";
    const { response } = await (0, import_fetch_resource.default)(url);
    import_assert.default.equal(response.statusCode, 200);
  });
});
describe("validateResponse(response)", () => {
  it("validates a response object", () => {
    const validResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": "text/html",
        "content-length": 500
      }
    };
    import_assert.default.equal((0, import_fetch_resource.validateResponse)(validResponse), true);
  });
  it("throws an error if there is no status code", () => {
    const invalidResponse = {};
    import_assert.default.throws(() => {
      (0, import_fetch_resource.validateResponse)(invalidResponse);
    }, /unable to fetch content/i);
  });
  it("throws an error if response code is not 200", () => {
    const invalidResponse = {
      statusCode: 500
    };
    import_assert.default.throws(() => {
      (0, import_fetch_resource.validateResponse)(invalidResponse);
    }, /instructed to reject non-200/i);
  });
  it("throws an error if response has bad content-type", () => {
    const invalidResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": "image/gif",
        "content-length": 500
      }
    };
    import_assert.default.throws(() => {
      (0, import_fetch_resource.validateResponse)(invalidResponse);
    }, /content-type for this resource/i);
  });
  it("throws an error if response length is > max", () => {
    const invalidResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": "text/html",
        "content-length": MAX_CONTENT_LENGTH + 1
      }
    };
    import_assert.default.throws(() => {
      (0, import_fetch_resource.validateResponse)(invalidResponse);
    }, /Content for this resource was too large/i);
  });
});
describe("baseDomain(parsedUrl)", () => {
  it("returns the base domain, excluding subdomain", () => {
    const url = "https://www.npmjs.com/package/request#streaming";
    const parsedUrl = import_url.default.parse(url);
    import_assert.default.equal((0, import_fetch_resource.baseDomain)(parsedUrl), "npmjs.com");
  });
  it("returns the base domain as is if no subdomain", () => {
    const url = "https://npmjs.com/package/request#streaming";
    const parsedUrl = import_url.default.parse(url);
    import_assert.default.equal((0, import_fetch_resource.baseDomain)(parsedUrl), "npmjs.com");
  });
});
