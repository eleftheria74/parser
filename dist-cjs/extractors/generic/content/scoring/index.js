var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
module.exports = {
  getWeight: async () => (await Promise.resolve().then(() => __toESM(require("./get-weight")))).default,
  getScore: async () => (await Promise.resolve().then(() => __toESM(require("./get-score")))).default,
  scoreCommas: async () => (await Promise.resolve().then(() => __toESM(require("./score-commas")))).default,
  scoreLength: async () => (await Promise.resolve().then(() => __toESM(require("./score-length")))).default,
  scoreParagraph: async () => (await Promise.resolve().then(() => __toESM(require("./score-paragraph")))).default,
  setScore: async () => (await Promise.resolve().then(() => __toESM(require("./set-score")))).default,
  addScore: async () => (await Promise.resolve().then(() => __toESM(require("./add-score")))).default,
  addToParent: async () => (await Promise.resolve().then(() => __toESM(require("./add-to-parent")))).default,
  getOrInitScore: async () => (await Promise.resolve().then(() => __toESM(require("./get-or-init-score")))).default,
  scoreNode: async () => (await Promise.resolve().then(() => __toESM(require("./score-node")))).default,
  scoreContent: async () => (await Promise.resolve().then(() => __toESM(require("./score-content")))).default,
  findTopCandidate: async () => (await Promise.resolve().then(() => __toESM(require("./find-top-candidate")))).default
};
