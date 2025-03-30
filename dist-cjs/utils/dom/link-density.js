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
var link_density_exports = {};
__export(link_density_exports, {
  linkDensity: () => linkDensity,
  textLength: () => textLength
});
module.exports = __toCommonJS(link_density_exports);
function textLength(text) {
  return text.trim().replace(/\s+/g, " ").length;
}
function linkDensity($node) {
  const totalTextLength = textLength($node.text());
  const linkText = $node.find("a").text();
  const linkLength = textLength(linkText);
  if (totalTextLength > 0) {
    return linkLength / totalTextLength;
  }
  if (totalTextLength === 0 && linkLength > 0) {
    return 1;
  }
  return 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  linkDensity,
  textLength
});
