// Extremely simple url validation as a first step
function validateUrl({ hostname }) {
  // If this isn't a valid url, return an error message
  return !!hostname;
}

module.exports = validateUrl;
