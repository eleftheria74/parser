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
var extractor_exports = {};
__export(extractor_exports, {
  clean: () => clean
});
module.exports = __toCommonJS(extractor_exports);
const ellipsize = require("ellipsize");
const { extractFromMeta, stripTags } = require("../../../resource/utils/dom");
const { EXCERPT_META_SELECTORS } = require("./constants");
function clean(content, $, maxLength = 200) {
  content = content.replace(/[\s\n]+/g, " ").trim();
  return ellipsize(content, maxLength, { ellipse: "&hellip;" });
}
const GenericExcerptExtractor = {
  extract({ $, content, metaCache }) {
    const excerpt = extractFromMeta($, EXCERPT_META_SELECTORS, metaCache);
    if (excerpt) {
      return clean(stripTags(excerpt, $));
    }
    const maxLength = 200;
    const shortContent = content.slice(0, maxLength * 5);
    return clean($(shortContent).text(), $, maxLength);
  }
};
module.exports = GenericExcerptExtractor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clean
});
