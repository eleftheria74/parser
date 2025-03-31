const cleanAuthor = require('./author');
const cleanImage = require('./lead-image-url');
const cleanDek = require('./dek');
const cleanDatePublished = require('./date-published');
const cleanContent = require('./content');
const resolveSplitTitle = require('./resolve-split-title');

const Cleaners = {
  author: cleanAuthor,
  lead_image_url: cleanImage,
  dek: cleanDek,
  date_published: cleanDatePublished,
  content: cleanContent,

  // Lazy-load για αποφυγή circular require
  get title() {
    return require('./title');
  },
};

module.exports = {
  Cleaners,
  cleanAuthor,
  cleanImage,
  cleanDek,
  cleanDatePublished,
  cleanContent,
  get cleanTitle() {
    return require('./title');
  },
  resolveSplitTitle
};
