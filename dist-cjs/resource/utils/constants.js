const cheerio = require("cheerio");
const REQUEST_HEADERS = cheerio.browser ? {} : {
  "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
};
const FETCH_TIMEOUT = 1e4;
const BAD_CONTENT_TYPES = [
  "audio/mpeg",
  "image/gif",
  "image/jpeg",
  "image/jpg"
];
const BAD_CONTENT_TYPES_RE = new RegExp(
  `^(${BAD_CONTENT_TYPES.join("|")})$`,
  "i"
);
const MAX_CONTENT_LENGTH = 5242880;
const PROXY_DOMAINS = false;
const REQUESTS_PROXIES = {
  http: "http://38.98.105.139:33333",
  https: "http://38.98.105.139:33333"
};
const DOMAINS_TO_PROXY = ["nih.gov", "gutenberg.org"];
module.exports = {
  REQUEST_HEADERS,
  FETCH_TIMEOUT,
  BAD_CONTENT_TYPES_RE,
  MAX_CONTENT_LENGTH,
  PROXY_DOMAINS,
  REQUESTS_PROXIES,
  DOMAINS_TO_PROXY
};
