const DIGIT_RE = /\d/;
module.exports.DIGIT_RE = DIGIT_RE;

// A list of words that, if found in link text or URLs, likely mean that
// this link is not a next page link.
const EXTRANEOUS_LINK_HINTS = [
  'print',
  'archive',
  'comment',
  'discuss',
  'e-mail',
  'email',
  'share',
  'reply',
  'all',
  'login',
  'sign',
  'single',
  'adx',
  'entry-unrelated',
];
module.exports.EXTRANEOUS_LINK_HINTS = EXTRANEOUS_LINK_HINTS;
const EXTRANEOUS_LINK_HINTS_RE = new RegExp(
  EXTRANEOUS_LINK_HINTS.join('|'),
  'i'
);
module.exports.EXTRANEOUS_LINK_HINTS_RE = EXTRANEOUS_LINK_HINTS_RE;

// Match any link text/classname/id that looks like it could mean the next
// page. Things like: next, continue, >, >>, » but not >|, »| as those can
// mean last page.
const NEXT_LINK_TEXT_RE = new RegExp(
  '(next|weiter|continue|>([^|]|$)|»([^|]|$))',
  'i'
);
module.exports.NEXT_LINK_TEXT_RE = NEXT_LINK_TEXT_RE;

// Match any link text/classname/id that looks like it is an end link: things
// like "first", "last", "end", etc.
const CAP_LINK_TEXT_RE = new RegExp('(first|last|end)', 'i');
module.exports.CAP_LINK_TEXT_RE = CAP_LINK_TEXT_RE;

// Match any link text/classname/id that looks like it means the previous
// page.
const PREV_LINK_TEXT_RE = new RegExp('(prev|earl|old|new|<|«)', 'i');
module.exports.PREV_LINK_TEXT_RE = PREV_LINK_TEXT_RE;

// Match any phrase that looks like it could be page, or paging, or pagination
const PAGE_RE = new RegExp('pag(e|ing|inat)', 'i');
module.exports.PAGE_RE = PAGE_RE;
