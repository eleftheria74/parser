module.exports = {
  normalizeMetaTags: require('./normalize-meta-tags'),
  convertLazyLoadedImages: require('./convert-lazy-loaded-images'),
  clean: require('./clean'),

  // Από το κοινό utils/dom (shared)
  getAttrs: require('../../../utils/dom/get-attrs'),
  setAttr: require('../../../utils/dom/set-attr'),
  setAttrs: require('../../../utils/dom/set-attrs'),
};
