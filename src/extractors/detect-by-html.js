const { MediumExtractor, BloggerExtractor } = require('./custom');

const Detectors = {
  'meta[name="al:ios:app_name"][value="Medium"]': MediumExtractor,
  'meta[name="generator"][value="blogger"]': BloggerExtractor,
};

function detectByHtml($) {
  const selector = Reflect.ownKeys(Detectors).find(s => $(s).length > 0);
  return Detectors[selector];
}

module.exports = detectByHtml;
