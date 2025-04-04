const cheerio = require("cheerio");
const { nodeIsSufficient } = require("../../../resource/utils/dom");
const { cleanContent } = require("../../../cleaners");
const { normalizeSpaces } = require("../../../utils/text");
const extractBestNode = require("./extract-best-node");
const GenericContentExtractor = {
  defaultOpts: {
    stripUnlikelyCandidates: true,
    weightNodes: true,
    cleanConditionally: true
  },
  // Extract the content for this resource - initially, pass in our
  // most restrictive opts which will return the highest quality
  // content. On each failure, retry with slightly more lax opts.
  //
  // :param return_type: string. If "node", should return the content
  // as a cheerio node rather than as an HTML string.
  //
  // Opts:
  // stripUnlikelyCandidates: Remove any elements that match
  // non-article-like criteria first.(Like, does this element
  //   have a classname of "comment")
  //
  // weightNodes: Modify an elements score based on whether it has
  // certain classNames or IDs. Examples: Subtract if a node has
  // a className of 'comment', Add if a node has an ID of
  // 'entry-content'.
  //
  // cleanConditionally: Clean the node to return of some
  // superfluous content. Things like forms, ads, etc.
  extract({ $, html, title, url }, opts) {
    opts = { ...this.defaultOpts, ...opts };
    $ = $ || cheerio.load(html);
    let node = this.getContentNode($, title, url, opts);
    if (nodeIsSufficient(node)) {
      return this.cleanAndReturnNode(node, $);
    }
    for (const key of Reflect.ownKeys(opts).filter((k) => opts[k] === true)) {
      opts[key] = false;
      $ = cheerio.load(html);
      node = this.getContentNode($, title, url, opts);
      if (nodeIsSufficient(node)) {
        break;
      }
    }
    return this.cleanAndReturnNode(node, $);
  },
  // Get node given current options
  getContentNode($, title, url, opts) {
    return cleanContent(extractBestNode($, opts), {
      $,
      cleanConditionally: opts.cleanConditionally,
      title,
      url
    });
  },
  // Once we got here, either we're at our last-resort node, or
  // we broke early. Make sure we at least have -something- before we
  // move forward.
  cleanAndReturnNode(node, $) {
    if (!node) {
      return null;
    }
    return normalizeSpaces($.html(node));
  }
};
module.exports = GenericContentExtractor;
