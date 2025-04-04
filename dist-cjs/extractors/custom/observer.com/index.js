const ObserverComExtractor = {
  domain: "observer.com",
  title: {
    selectors: ["h1.entry-title"]
  },
  author: {
    selectors: [".author", ".vcard"]
  },
  date_published: {
    selectors: [['meta[name="article:published_time"]', "value"]]
  },
  dek: {
    selectors: ["h2.dek"]
  },
  lead_image_url: {
    selectors: [['meta[name="og:image"]', "value"]]
  },
  content: {
    selectors: ["div.entry-content"],
    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},
    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: []
  }
};
module.exports.ObserverComExtractor = ObserverComExtractor;
