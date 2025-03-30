const { parse } = require("url");
const {
  HAS_ALPHA_RE,
  IS_ALPHA_RE,
  IS_DIGIT_RE,
  PAGE_IN_HREF_RE
} = require("./constants");
function isGoodSegment(segment, index, firstSegmentHasLetters) {
  let goodSegment = true;
  if (index < 2 && IS_DIGIT_RE.test(segment) && segment.length < 3) {
    goodSegment = true;
  }
  if (index === 0 && segment.toLowerCase() === "index") {
    goodSegment = false;
  }
  if (index < 2 && segment.length < 3 && !firstSegmentHasLetters) {
    goodSegment = false;
  }
  return goodSegment;
}
function articleBaseUrl(url, parsed) {
  const parsedUrl = parsed || parse(url);
  const { protocol, host, path } = parsedUrl;
  let firstSegmentHasLetters = false;
  const cleanedSegments = path.split("/").reverse().reduce((acc, rawSegment, index) => {
    let segment = rawSegment;
    if (segment.includes(".")) {
      const [possibleSegment, fileExt] = segment.split(".");
      if (IS_ALPHA_RE.test(fileExt)) {
        segment = possibleSegment;
      }
    }
    if (PAGE_IN_HREF_RE.test(segment) && index < 2) {
      segment = segment.replace(PAGE_IN_HREF_RE, "");
    }
    if (index === 0) {
      firstSegmentHasLetters = HAS_ALPHA_RE.test(segment);
    }
    if (isGoodSegment(segment, index, firstSegmentHasLetters)) {
      acc.push(segment);
    }
    return acc;
  }, []);
  return `${protocol}//${host}${cleanedSegments.reverse().join("/")}`;
}
module.exports = articleBaseUrl;
