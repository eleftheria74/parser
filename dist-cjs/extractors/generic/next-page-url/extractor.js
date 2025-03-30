const URL = require("url");
const { articleBaseUrl, removeAnchor } = require("../../../resource/utils/text");
const scoreLinks = require("./scoring/score-links");
const GenericNextPageUrlExtractor = {
  extract({ $, url, parsedUrl, previousUrls = [] }) {
    parsedUrl = parsedUrl || URL.parse(url);
    const articleUrl = removeAnchor(url);
    const baseUrl = articleBaseUrl(url, parsedUrl);
    const links = $("a[href]").toArray();
    const scoredLinks = scoreLinks({
      links,
      articleUrl,
      baseUrl,
      parsedUrl,
      $,
      previousUrls
    });
    if (!scoredLinks)
      return null;
    const topPage = Reflect.ownKeys(scoredLinks).reduce(
      (acc, link) => {
        const scoredLink = scoredLinks[link];
        return scoredLink.score > acc.score ? scoredLink : acc;
      },
      { score: -100 }
    );
    if (topPage.score >= 50) {
      return topPage.href;
    }
    return null;
  }
};
module.exports = GenericNextPageUrlExtractor;
