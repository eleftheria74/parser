const SectIijAdJpExtractor = {
  domain: "sect.iij.ad.jp",
  title: {
    selectors: ["div.title-box-inner h1", "h3"]
  },
  author: {
    selectors: ["p.post-author a", "dl.entrydate dd"]
  },
  date_published: {
    selectors: ["time"],
    format: "YYYY\u5E74MM\u6708DD\u65E5",
    timezone: "Asia/Tokyo"
  },
  dek: null,
  lead_image_url: {
    selectors: [['meta[name="og:image"]', "value"]]
  },
  content: {
    selectors: [".entry-inner", "#article"],
    transforms: {},
    clean: ["dl.entrydate"]
  }
};
module.exports.SectIijAdJpExtractor = SectIijAdJpExtractor;
