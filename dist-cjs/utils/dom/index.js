module.exports = {
  stripUnlikelyCandidates: require("./strip-unlikely-candidates"),
  brsToPs: require("./brs-to-ps"),
  paragraphize: require("./paragraphize"),
  convertToParagraphs: require("./convert-to-paragraphs"),
  convertNodeTo: require("./convert-node-to"),
  cleanImages: require("./clean-images"),
  markToKeep: require("./mark-to-keep"),
  stripJunkTags: require("./strip-junk-tags"),
  cleanHOnes: require("./clean-h-ones"),
  cleanAttributes: require("./clean-attributes"),
  removeEmpty: require("./remove-empty"),
  cleanTags: require("./clean-tags"),
  cleanHeaders: require("./clean-headers"),
  rewriteTopLevel: require("./rewrite-top-level"),
  makeLinksAbsolute: require("./make-links-absolute"),
  // Avoid circular dependency by lazy-loading
  get textLength() {
    return require("./link-density").textLength;
  },
  get linkDensity() {
    return require("./link-density").linkDensity;
  },
  extractFromMeta: require("./extract-from-meta"),
  extractFromSelectors: require("./extract-from-selectors"),
  stripTags: require("./strip-tags"),
  withinComment: require("./within-comment"),
  nodeIsSufficient: require("./node-is-sufficient"),
  isWordpress: require("./is-wordpress"),
  getAttrs: require("./get-attrs"),
  setAttr: require("./set-attr"),
  setAttrs: require("./set-attrs")
};
