const mergeSupportedDomains = require("../utils/merge-supported-domains");
const CustomExtractors = require("./custom");
const allExtractors = Object.keys(CustomExtractors).reduce((acc, key) => {
  const extractor = CustomExtractors[key];
  return {
    ...acc,
    ...mergeSupportedDomains(extractor)
  };
}, {});
module.exports = allExtractors;
