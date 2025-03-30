const WwwEngadgetComExtractor = {
  domain: "www.engadget.com",
  title: {
    selectors: [['meta[name="og:title"]', "value"]]
  },
  author: {
    selectors: ['a.th-meta[data-ylk*="subsec:author"]']
  },
  date_published: {
    selectors: []
  },
  dek: {
    selectors: ['div[class*="o-title_mark"] div']
  },
  lead_image_url: {
    selectors: []
  },
  content: {
    selectors: [
      [
        "#page_body figure:not(div.article-text figure)",
        "div.article-text"
      ]
    ],
    transforms: {},
    clean: []
  }
};
module.exports = {
  WwwEngadgetComExtractor
};
