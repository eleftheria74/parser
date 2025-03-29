const URL = require('url');
const request = require('postman-request');

const {
  REQUEST_HEADERS,
  FETCH_TIMEOUT,
  BAD_CONTENT_TYPES_RE,
  MAX_CONTENT_LENGTH,
} = require('./constants');

function get(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve({ body, response });
      }
    });
  });
}

function validateResponse(response, parseNon200 = false) {
  if (
    (response.statusMessage && response.statusMessage !== 'OK') ||
    response.statusCode !== 200
  ) {
    if (!response.statusCode) {
      throw new Error(
        `Unable to fetch content. Original exception was ${response.error}`
      );
    } else if (!parseNon200) {
      throw new Error(
        `Resource returned a response status code of ${
          response.statusCode
        } and resource was instructed to reject non-200 status codes.`
      );
    }
  }

  const {
    'content-type': contentType,
    'content-length': contentLength,
  } = response.headers;

  if (BAD_CONTENT_TYPES_RE.test(contentType)) {
    throw new Error(
      `Content-type for this resource was ${contentType} and is not allowed.`
    );
  }

  if (contentLength > MAX_CONTENT_LENGTH) {
    throw new Error(
      `Content for this resource was too large. Maximum content length is ${MAX_CONTENT_LENGTH}.`
    );
  }

  return true;
}

function baseDomain({ host }) {
  return host
    .split('.')
    .slice(-2)
    .join('.');
}

async function fetchResource(url, parsedUrl, headers = {}) {
  parsedUrl = parsedUrl || URL.parse(encodeURI(url));
  const options = {
    url: parsedUrl.href,
    headers: { ...REQUEST_HEADERS, ...headers },
    timeout: FETCH_TIMEOUT,
    jar: true,
    encoding: null,
    gzip: true,
    followAllRedirects: true,
    ...(typeof window !== 'undefined'
      ? {}
      : {
          followRedirect: true,
        }),
  };

  const { response, body } = await get(options);

  try {
    validateResponse(response);
    return {
      body,
      response,
    };
  } catch (e) {
    return {
      error: true,
      message: e.message,
    };
  }
}

module.exports = fetchResource;
module.exports.validateResponse = validateResponse;
module.exports.baseDomain = baseDomain;
