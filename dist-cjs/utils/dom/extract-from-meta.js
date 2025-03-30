const { stripTags } = require("../../resource/utils/dom");
module.exports = function extractFromMeta($, metaNames, cachedNames, cleanTags = true) {
  const foundNames = metaNames.filter((name) => cachedNames.indexOf(name) !== -1);
  for (const name of foundNames) {
    const type = "name";
    const value = "value";
    const nodes = $(`meta[${type}="${name}"]`);
    const values = nodes.map((index, node) => $(node).attr(value)).toArray().filter((text) => text !== "");
    if (values.length === 1) {
      let metaValue;
      if (cleanTags) {
        metaValue = stripTags(values[0], $);
      } else {
        [metaValue] = values;
      }
      return metaValue;
    }
  }
  return null;
};
