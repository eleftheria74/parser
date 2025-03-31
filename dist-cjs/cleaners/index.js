const cleanAuthor = require("./author");
const cleanImage = require("./lead-image-url");
const cleanDek = require("./dek");
const cleanDatePublished = require("./date-published");
const cleanContent = require("./content");
const resolveSplitTitle = require("./resolve-split-title");
const Cleaners = {
  author: cleanAuthor,
  lead_image_url: cleanImage,
  dek: cleanDek,
  date_published: cleanDatePublished,
  content: cleanContent
};
module.exports = {
  Cleaners,
  cleanAuthor,
  cleanImage,
  cleanDek,
  cleanDatePublished,
  cleanContent,
  resolveSplitTitle
};
