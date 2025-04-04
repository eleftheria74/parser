const WwwPublickey1JpExtractor = {
  domain: "www.publickey1.jp",
  title: {
    selectors: ["h1"]
  },
  author: {
    selectors: [".bloggerinchief p:first-of-type", "#subcol p:has(img)"]
  },
  date_published: {
    selectors: ["div.pubdate"],
    format: "YYYY\u5E74MM\u6708DD\u65E5",
    timezone: "Asia/Tokyo"
  },
  dek: null,
  lead_image_url: {
    selectors: [['meta[name="og:image"]', "value"]]
  },
  content: {
    selectors: ["#maincol"],
    defaultCleaner: false,
    transforms: {},
    clean: ["#breadcrumbs", "div.sbm", "div.ad_footer"]
  }
};
module.exports.WwwPublickey1JpExtractor = WwwPublickey1JpExtractor;
