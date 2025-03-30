var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var score_image_exports = {};
__export(score_image_exports, {
  scoreAttr: () => scoreAttr,
  scoreByDimensions: () => scoreByDimensions,
  scoreByParents: () => scoreByParents,
  scoreByPosition: () => scoreByPosition,
  scoreBySibling: () => scoreBySibling,
  scoreImageUrl: () => scoreImageUrl
});
module.exports = __toCommonJS(score_image_exports);
const {
  POSITIVE_LEAD_IMAGE_URL_HINTS_RE,
  NEGATIVE_LEAD_IMAGE_URL_HINTS_RE,
  GIF_RE,
  JPG_RE
} = require("./constants");
const { PHOTO_HINTS_RE } = require("../content/scoring/constants");
function getSig($node) {
  return `${$node.attr("class") || ""} ${$node.attr("id") || ""}`;
}
function scoreImageUrl(url) {
  url = url.trim();
  let score = 0;
  if (POSITIVE_LEAD_IMAGE_URL_HINTS_RE.test(url)) {
    score += 20;
  }
  if (NEGATIVE_LEAD_IMAGE_URL_HINTS_RE.test(url)) {
    score -= 20;
  }
  if (GIF_RE.test(url)) {
    score -= 10;
  }
  if (JPG_RE.test(url)) {
    score += 10;
  }
  return score;
}
function scoreAttr($img) {
  if ($img.attr("alt")) {
    return 5;
  }
  return 0;
}
function scoreByParents($img) {
  let score = 0;
  const $figParent = $img.parents("figure").first();
  if ($figParent.length === 1) {
    score += 25;
  }
  const $parent = $img.parent();
  let $gParent;
  if ($parent.length === 1) {
    $gParent = $parent.parent();
  }
  [$parent, $gParent].forEach(($node) => {
    if (PHOTO_HINTS_RE.test(getSig($node))) {
      score += 15;
    }
  });
  return score;
}
function scoreBySibling($img) {
  let score = 0;
  const $sibling = $img.next();
  const sibling = $sibling.get(0);
  if (sibling && sibling.tagName.toLowerCase() === "figcaption") {
    score += 25;
  }
  if (PHOTO_HINTS_RE.test(getSig($sibling))) {
    score += 15;
  }
  return score;
}
function scoreByDimensions($img) {
  let score = 0;
  const width = parseFloat($img.attr("width"));
  const height = parseFloat($img.attr("height"));
  const src = $img.attr("src");
  if (width && width <= 50) {
    score -= 50;
  }
  if (height && height <= 50) {
    score -= 50;
  }
  if (width && height && !src.includes("sprite")) {
    const area = width * height;
    if (area < 5e3) {
      score -= 100;
    } else {
      score += Math.round(area / 1e3);
    }
  }
  return score;
}
function scoreByPosition($imgs, index) {
  return $imgs.length / 2 - index;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  scoreAttr,
  scoreByDimensions,
  scoreByParents,
  scoreByPosition,
  scoreBySibling,
  scoreImageUrl
});
