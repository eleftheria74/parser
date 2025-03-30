const WwwIpaGoJpExtractor = {
  domain: "www.ipa.go.jp",
  title: {
    selectors: ["h1"]
  },
  author: null,
  date_published: {
    selectors: ["p.ipar_text_right"],
    format: "YYYY\u5E74M\u6708D\u65E5",
    timezone: "Asia/Tokyo"
  },
  dek: null,
  lead_image_url: null,
  content: {
    selectors: ["#ipar_main"],
    defaultCleaner: false,
    transforms: {},
    clean: ["p.ipar_text_right"]
  }
};
module.exports.WwwIpaGoJpExtractor = WwwIpaGoJpExtractor;
