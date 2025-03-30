const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const { getEncoding } = require("../utils/text");
const { fetchResource } = require("./utils");
const { normalizeMetaTags, convertLazyLoadedImages, clean } = require("./utils/dom");
const Resource = {
  async create(url, preparedResponse, parsedUrl, headers = {}) {
    let result;
    if (preparedResponse) {
      const validResponse = {
        statusMessage: "OK",
        statusCode: 200,
        headers: {
          "content-type": "text/html",
          "content-length": 500
        }
      };
      result = {
        body: preparedResponse,
        response: validResponse,
        alreadyDecoded: true
      };
    } else {
      result = await fetchResource(url, parsedUrl, headers);
    }
    if (result.error) {
      result.failed = true;
      return result;
    }
    return this.generateDoc(result);
  },
  generateDoc({ body: content, response, alreadyDecoded = false }) {
    const { "content-type": contentType = "" } = response.headers;
    if (!contentType.includes("html") && !contentType.includes("text")) {
      throw new Error("Content does not appear to be text.");
    }
    let $ = this.encodeDoc({ content, contentType, alreadyDecoded });
    if ($.root().children().length === 0) {
      throw new Error("No children, likely a bad parse.");
    }
    $ = normalizeMetaTags($);
    $ = convertLazyLoadedImages($);
    $ = clean($);
    return $;
  },
  encodeDoc({ content, contentType, alreadyDecoded = false }) {
    if (alreadyDecoded) {
      return cheerio.load(content);
    }
    const encoding = getEncoding(contentType);
    let decodedContent = iconv.decode(content, encoding);
    let $ = cheerio.load(decodedContent);
    const contentTypeSelector = cheerio.browser ? "meta[http-equiv=content-type]" : "meta[http-equiv=content-type i]";
    const metaContentType = $(contentTypeSelector).attr("content") || $("meta[charset]").attr("charset");
    const properEncoding = getEncoding(metaContentType);
    if (metaContentType && properEncoding !== encoding) {
      decodedContent = iconv.decode(content, properEncoding);
      $ = cheerio.load(decodedContent);
    }
    return $;
  }
};
module.exports = Resource;
