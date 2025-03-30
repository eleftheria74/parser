const URL = require("url");
const { getAttrs, isWordpress } = require("../../../../resource/utils/dom");
const { removeAnchor, pageNumFromUrl } = require("../../../../utils/text");
const {
  scoreSimilarity,
  scoreLinkText,
  scorePageInLink,
  scoreExtraneousLinks,
  scoreByParents,
  scorePrevLink,
  shouldScore,
  scoreBaseUrl,
  scoreCapLinks,
  scoreNextLinkText
} = require("./utils");
function makeBaseRegex(baseUrl) {
  return new RegExp(`^${baseUrl}`, "i");
}
function makeSig($link, linkText) {
  return `${linkText || $link.text()} ${$link.attr("class") || ""} ${$link.attr(
    "id"
  ) || ""}`;
}
module.exports = function scoreLinks({
  links,
  articleUrl,
  baseUrl,
  parsedUrl,
  $,
  previousUrls = []
}) {
  parsedUrl = parsedUrl || URL.parse(articleUrl);
  const baseRegex = makeBaseRegex(baseUrl);
  const isWp = isWordpress($);
  const scoredPages = links.reduce((possiblePages, link) => {
    const attrs = getAttrs(link);
    if (!attrs.href)
      return possiblePages;
    const href = removeAnchor(attrs.href);
    const $link = $(link);
    const linkText = $link.text();
    if (!shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)) {
      return possiblePages;
    }
    if (!possiblePages[href]) {
      possiblePages[href] = {
        score: 0,
        linkText,
        href
      };
    } else {
      possiblePages[href].linkText = `${possiblePages[href].linkText}|${linkText}`;
    }
    const possiblePage = possiblePages[href];
    const linkData = makeSig($link, linkText);
    const pageNum = pageNumFromUrl(href);
    let score = scoreBaseUrl(href, baseRegex);
    score += scoreNextLinkText(linkData);
    score += scoreCapLinks(linkData);
    score += scorePrevLink(linkData);
    score += scoreByParents($link);
    score += scoreExtraneousLinks(href);
    score += scorePageInLink(pageNum, isWp);
    score += scoreLinkText(linkText, pageNum);
    score += scoreSimilarity(score, articleUrl, href);
    possiblePage.score = score;
    return possiblePages;
  }, {});
  return Reflect.ownKeys(scoredPages).length === 0 ? null : scoredPages;
};
module.exports = {
  textLength,
  linkDensity
};
