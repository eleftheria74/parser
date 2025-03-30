const WwwInfoqComExtractor = {
  domain: "www.infoq.com",
  title: {
    selectors: ["h1.heading"]
  },
  author: {
    selectors: ["div.widget.article__authors"]
  },
  date_published: {
    selectors: [".article__readTime.date"],
    format: "YYYY\u5E74MM\u6708DD\u65E5",
    timezone: "Asia/Tokyo"
  },
  dek: {
    selectors: [['meta[name="og:description"]', "value"]]
  },
  lead_image_url: {
    selectors: [['meta[name="og:image"]', "value"]]
  },
  content: {
    selectors: ["div.article__data"],
    defaultCleaner: false,
    transforms: {},
    clean: []
  }
};
module.exports.WwwInfoqComExtractor = WwwInfoqComExtractor;
