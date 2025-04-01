const cheerio = require("cheerio");
const TurndownService = require("turndown");
const Resource = require("./resource/index.js");
const { validateUrl } = require("./utils");
const addCustomExtractor = require("./extractors/add-extractor");
const getExtractor = require("./extractors/get-extractor");
const RootExtractor = require("./extractors/root-extractor");
const { selectExtendedTypes } = require("./extractors/root-extractor");
const collectAllPages = require("./extractors/collect-all-pages");
const Parser = {
  async parse(url, { html, ...opts } = {}) {
    const {
      fetchAllPages = true,
      fallback = true,
      contentType = "html",
      headers = {},
      extend,
      customExtractor
    } = opts;
    if (!url && cheerio.browser) {
      url = window.location.href;
      html = html || cheerio.html();
    }
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return {
        error: true,
        message: "The url parameter passed does not look like a valid URL. Please check your URL and try again."
      };
    }
    if (!validateUrl(parsedUrl)) {
      return {
        error: true,
        message: "The url parameter passed does not look like a valid URL. Please check your URL and try again."
      };
    }
    const $ = await Resource.create(url, html, parsedUrl, headers);
    if ($.failed) {
      return $;
    }
    if (customExtractor) {
      addCustomExtractor(customExtractor);
    }
    const Extractor = getExtractor(url, parsedUrl, $);
    if (!html) {
      html = $.html();
    }
    const metaCache = $("meta").map((_, node) => $(node).attr("name")).toArray();
    let extendedTypes = {};
    if (extend) {
      extendedTypes = selectExtendedTypes(extend, { $, url, html });
    }
    let result = RootExtractor.extract(Extractor, {
      url,
      html,
      $,
      metaCache,
      parsedUrl,
      fallback,
      contentType
    });
    const { title, next_page_url } = result;
    if (fetchAllPages && next_page_url) {
      result = await collectAllPages({
        Extractor,
        next_page_url,
        html,
        $,
        metaCache,
        result,
        title,
        url
      });
    } else {
      result = {
        ...result,
        total_pages: 1,
        rendered_pages: 1
      };
    }
    if (contentType === "markdown") {
      const turndownService = new TurndownService();
      result.content = turndownService.turndown(result.content);
    } else if (contentType === "text") {
      result.content = $.text($(result.content));
    }
    return { ...result, ...extendedTypes };
  },
  browser: !!cheerio.browser,
  fetchResource(url) {
    return Resource.create(url);
  },
  addExtractor(extractor) {
    return addCustomExtractor(extractor);
  }
};
module.exports = Parser;
