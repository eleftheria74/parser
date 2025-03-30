const { removeAnchor } = require("../utils/text");
const RootExtractor = require("./root-extractor");
const GenericExtractor = require("./generic");
const Resource = require("../resource");
async function collectAllPages({
  next_page_url,
  html,
  $,
  metaCache,
  result,
  Extractor,
  title,
  url
}) {
  let pages = 1;
  const previousUrls = [removeAnchor(url)];
  while (next_page_url && pages < 26) {
    pages += 1;
    $ = await Resource.create(next_page_url);
    html = $.html();
    const extractorOpts = {
      url: next_page_url,
      html,
      $,
      metaCache,
      extractedTitle: title,
      previousUrls
    };
    const nextPageResult = RootExtractor.extract(Extractor, extractorOpts);
    previousUrls.push(next_page_url);
    result = {
      ...result,
      content: `${result.content}<hr><h4>Page ${pages}</h4>${nextPageResult.content}`
    };
    next_page_url = nextPageResult.next_page_url;
  }
  const word_count = GenericExtractor.word_count({
    content: `<div>${result.content}</div>`
  });
  return {
    ...result,
    total_pages: pages,
    rendered_pages: pages,
    word_count
  };
}
module.exports = collectAllPages;
