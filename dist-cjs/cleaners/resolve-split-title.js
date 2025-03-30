const URL = require("url");
const wuzzy = require("wuzzy");
const { TITLE_SPLITTERS_RE, DOMAIN_ENDINGS_RE } = require("./constants");
function extractBreadcrumbTitle(splitTitle, text) {
  if (splitTitle.length >= 6) {
    const termCounts = splitTitle.reduce((acc, titleText) => {
      acc[titleText] = acc[titleText] ? acc[titleText] + 1 : 1;
      return acc;
    }, {});
    const [maxTerm, termCount] = Reflect.ownKeys(termCounts).reduce(
      (acc, key) => {
        if (acc[1] < termCounts[key]) {
          return [key, termCounts[key]];
        }
        return acc;
      },
      [0, 0]
    );
    if (termCount >= 2 && maxTerm.length <= 4) {
      splitTitle = text.split(maxTerm);
    }
    const splitEnds = [splitTitle[0], splitTitle.slice(-1)];
    const longestEnd = splitEnds.reduce(
      (acc, end) => acc.length > end.length ? acc : end,
      ""
    );
    if (longestEnd.length > 10) {
      return longestEnd;
    }
    return text;
  }
  return null;
}
function cleanDomainFromTitle(splitTitle, url) {
  const { host } = URL.parse(url);
  const nakedDomain = host.replace(DOMAIN_ENDINGS_RE, "");
  const startSlug = splitTitle[0].toLowerCase().replace(" ", "");
  const startSlugRatio = wuzzy.levenshtein(startSlug, nakedDomain);
  if (startSlugRatio > 0.4 && startSlug.length > 5) {
    return splitTitle.slice(2).join("");
  }
  const endSlug = splitTitle.slice(-1)[0].toLowerCase().replace(" ", "");
  const endSlugRatio = wuzzy.levenshtein(endSlug, nakedDomain);
  if (endSlugRatio > 0.4 && endSlug.length >= 5) {
    return splitTitle.slice(0, -2).join("");
  }
  return null;
}
module.exports = function resolveSplitTitle(title, url = "") {
  const splitTitle = title.split(TITLE_SPLITTERS_RE);
  if (splitTitle.length === 1) {
    return title;
  }
  let newTitle = extractBreadcrumbTitle(splitTitle, title);
  if (newTitle)
    return newTitle;
  newTitle = cleanDomainFromTitle(splitTitle, url);
  if (newTitle)
    return newTitle;
  return title;
};
