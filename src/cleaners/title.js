const { stripTags } = require('../resource/utils/dom');
const { normalizeSpaces } = require('../utils/text');

const { TITLE_SPLITTERS_RE } = require('./constants');

// Χρήση δυναμικής φόρτωσης για να αποφύγουμε κυκλική εξάρτηση
let resolveSplitTitle;
module.exports = function cleanTitle(title, { url, $ }) {
  // Αν το title έχει |, :, ή - στη μέση, προσπαθούμε να το καθαρίσουμε
  if (TITLE_SPLITTERS_RE.test(title)) {
    if (!resolveSplitTitle) {
      resolveSplitTitle = require('./index').resolveSplitTitle; // Φορτώνεται μόνο όταν είναι απαραίτητο
    }
    title = resolveSplitTitle(title, url);
  }

  // Τελικός έλεγχος για να δούμε αν το τίτλο είναι πολύ μεγάλο ή μικρό
  if (title.length > 150) {
    // Αν είναι πολύ μεγάλο, παίρνουμε το h1 από το έγγραφο αν υπάρχει
    const h1 = $('h1');
    if (h1.length === 1) {
      title = h1.text();
    }
  }

  // Αφαιρούμε τα HTML tags από το τίτλο
  return normalizeSpaces(stripTags(title, $).trim());
};
