const DIGIT_RE = /\d/;
module.exports.DIGIT_RE = DIGIT_RE;
const EXTRANEOUS_LINK_HINTS = [
  "print",
  "archive",
  "comment",
  "discuss",
  "e-mail",
  "email",
  "share",
  "reply",
  "all",
  "login",
  "sign",
  "single",
  "adx",
  "entry-unrelated"
];
module.exports.EXTRANEOUS_LINK_HINTS = EXTRANEOUS_LINK_HINTS;
const EXTRANEOUS_LINK_HINTS_RE = new RegExp(
  EXTRANEOUS_LINK_HINTS.join("|"),
  "i"
);
module.exports.EXTRANEOUS_LINK_HINTS_RE = EXTRANEOUS_LINK_HINTS_RE;
const NEXT_LINK_TEXT_RE = new RegExp(
  "(next|weiter|continue|>([^|]|$)|\xBB([^|]|$))",
  "i"
);
module.exports.NEXT_LINK_TEXT_RE = NEXT_LINK_TEXT_RE;
const CAP_LINK_TEXT_RE = new RegExp("(first|last|end)", "i");
module.exports.CAP_LINK_TEXT_RE = CAP_LINK_TEXT_RE;
const PREV_LINK_TEXT_RE = new RegExp("(prev|earl|old|new|<|\xAB)", "i");
module.exports.PREV_LINK_TEXT_RE = PREV_LINK_TEXT_RE;
const PAGE_RE = new RegExp("pag(e|ing|inat)", "i");
module.exports.PAGE_RE = PAGE_RE;
