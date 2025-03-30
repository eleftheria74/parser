const JapanCnetComExtractor = {
  domain: "japan.cnet.com",
  title: {
    selectors: [".leaf-headline-ttl"]
  },
  author: {
    selectors: [".writer"]
  },
  date_published: {
    selectors: [".date"],
    format: "YYYY\u5E74MM\u6708DD\u65E5 HH\u6642mm\u5206",
    timezone: "Asia/Tokyo"
  },
  dek: null,
  lead_image_url: {
    selectors: [['meta[name="og:image"]', "value"]]
  },
  content: {
    selectors: ["div.article_body"],
    transforms: {},
    clean: []
  }
};
module.exports.JapanCnetComExtractor = JapanCnetComExtractor;
