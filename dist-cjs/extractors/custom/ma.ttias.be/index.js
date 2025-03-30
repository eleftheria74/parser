const MaTtiasBeExtractor = {
  domain: "ma.ttias.be",
  title: {
    selectors: [['meta[name="twitter:title"]', "value"]]
  },
  author: {
    selectors: [['meta[name="author"]', "value"]]
  },
  date_published: {
    selectors: [['meta[name="article:published_time"]', "value"]]
  },
  content: {
    selectors: [[".content"]],
    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      h2: ($node) => {
        $node.attr("id", null);
        module.exports.MaTtiasBeExtractor = MaTtiasBeExtractor;
        return "h3";
      },
      h1: ($node) => {
        $node.attr("id", null);
        $node.after("<p></p>");
      },
      ul: ($node) => {
        $node.attr("class", "entry-content-asset");
      }
    }
  }
};
