const { parse } = require("url");
const Extractors = require("./all");
const GenericExtractor = require("./generic");
const detectByHtml = require("./detect-by-html");
const { apiExtractors } = require("./add-extractor");
function getExtractor(url, parsedUrl, $) {
  parsedUrl = parsedUrl || parse(url);
  const { hostname } = parsedUrl;
  const baseDomain = hostname.split(".").slice(-2).join(".");
  return apiExtractors[hostname] || apiExtractors[baseDomain] || Extractors[hostname] || Extractors[baseDomain] || detectByHtml($) || GenericExtractor;
}
module.exports = getExtractor;
