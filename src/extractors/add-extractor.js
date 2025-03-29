const mergeSupportedDomains = require('../utils/merge-supported-domains');

const apiExtractors = {};

function addExtractor(extractor) {
  if (!extractor || !extractor.domain) {
    return {
      error: true,
      message: 'Unable to add custom extractor. Invalid parameters.',
    };
  }

  Object.assign(apiExtractors, mergeSupportedDomains(extractor));

  return apiExtractors;
}

module.exports = {
  apiExtractors,
  addExtractor
};
