// // CONTENT FETCHING CONSTANTS ////

// A list of strings that can be considered unlikely candidates when
// extracting content from a resource. These strings are joined together
// and then tested for existence using re:test, so may contain simple,
// non-pipe style regular expression queries if necessary.
const UNLIKELY_CANDIDATES_BLACKLIST = [
  'ad-break',
  'adbox',
  'advert',
  'addthis',
  'agegate',
  'aux',
  'blogger-labels',
  'combx',
  'comment',
  'conversation',
  'disqus',
  'entry-unrelated',
  'extra',
  'foot',
  'form',
  'header',
  'hidden',
  'loader',
  'login', // Note: This can hit 'blogindex'.
  'menu',
  'meta',
  'nav',
  'pager',
  'pagination',
  'predicta', // readwriteweb inline ad box
  'presence_control_external', // lifehacker.com container full of false positives
  'popup',
  'printfriendly',
  'related',
  'remove',
  'remark',
  'rss',
  'share',
  'shoutbox',
  'sidebar',
  'sociable',
  'sponsor',
  'tools',
];
module.exports.UNLIKELY_CANDIDATES_BLACKLIST = UNLIKELY_CANDIDATES_BLACKLIST;

// A list of strings that can be considered LIKELY candidates when
// extracting content from a resource. Essentially, the inverse of the
// blacklist above - if something matches both blacklist and whitelist,
// it is kept. This is useful, for example, if something has a className
// of "rss-content entry-content". It matched 'rss', so it would normally
// be removed, however, it's also the entry content, so it should be left
// alone.
//
// These strings are joined together and then tested for existence using
// re:test, so may contain simple, non-pipe style regular expression queries
// if necessary.
const UNLIKELY_CANDIDATES_WHITELIST = [
  'and',
  'article',
  'body',
  'blogindex',
  'column',
  'content',
  'entry-content-asset',
  'format', // misuse of form
  'hfeed',
  'hentry',
  'hatom',
  'main',
  'page',
  'posts',
  'shadow',
];
module.exports.UNLIKELY_CANDIDATES_WHITELIST = UNLIKELY_CANDIDATES_WHITELIST;

// A list of tags which, if found inside, should cause a <div /> to NOT
// be turned into a paragraph tag. Shallow div tags without these elements
// should be turned into <p /> tags.
const DIV_TO_P_BLOCK_TAGS = [
  'a',
  'blockquote',
  'dl',
  'div',
  'img',
  'p',
  'pre',
  'table',
].join(',');
module.exports.DIV_TO_P_BLOCK_TAGS = DIV_TO_P_BLOCK_TAGS;

// A list of tags that should be ignored when trying to find the top candidate
// for a document.
const NON_TOP_CANDIDATE_TAGS = [
  'br',
  'b',
  'i',
  'label',
  'hr',
  'area',
  'base',
  'basefont',
  'input',
  'img',
  'link',
  'meta',
];
module.exports.NON_TOP_CANDIDATE_TAGS = NON_TOP_CANDIDATE_TAGS;

const NON_TOP_CANDIDATE_TAGS_RE = new RegExp(
  `^(${NON_TOP_CANDIDATE_TAGS.join('|')})// // CONTENT FETCHING CONSTANTS ////

// A list of strings that can be considered unlikely candidates when
// extracting content from a resource. These strings are joined together
// and then tested for existence using re:test, so may contain simple,
// non-pipe style regular expression queries if necessary.
const UNLIKELY_CANDIDATES_BLACKLIST = [
  'ad-break',
  'adbox',
  'advert',
  'addthis',
  'agegate',
  'aux',
  'blogger-labels',
  'combx',
  'comment',
  'conversation',
  'disqus',
  'entry-unrelated',
  'extra',
  'foot',
  'form',
  'header',
  'hidden',
  'loader',
  'login', // Note: This can hit 'blogindex'.
  'menu',
  'meta',
  'nav',
  'pager',
  'pagination',
  'predicta', // readwriteweb inline ad box
  'presence_control_external', // lifehacker.com container full of false positives
  'popup',
  'printfriendly',
  'related',
  'remove',
  'remark',
  'rss',
  'share',
  'shoutbox',
  'sidebar',
  'sociable',
  'sponsor',
  'tools',
];
module.exports.UNLIKELY_CANDIDATES_BLACKLIST = UNLIKELY_CANDIDATES_BLACKLIST;

// A list of strings that can be considered LIKELY candidates when
// extracting content from a resource. Essentially, the inverse of the
// blacklist above - if something matches both blacklist and whitelist,
// it is kept. This is useful, for example, if something has a className
// of "rss-content entry-content". It matched 'rss', so it would normally
// be removed, however, it's also the entry content, so it should be left
// alone.
//
// These strings are joined together and then tested for existence using
// re:test, so may contain simple, non-pipe style regular expression queries
// if necessary.
const UNLIKELY_CANDIDATES_WHITELIST = [
  'and',
  'article',
  'body',
  'blogindex',
  'column',
  'content',
  'entry-content-asset',
  'format', // misuse of form
  'hfeed',
  'hentry',
  'hatom',
  'main',
  'page',
  'posts',
  'shadow',
];
module.exports.UNLIKELY_CANDIDATES_WHITELIST = UNLIKELY_CANDIDATES_WHITELIST;

// A list of tags which, if found inside, should cause a <div /> to NOT
// be turned into a paragraph tag. Shallow div tags without these elements
// should be turned into <p /> tags.
const DIV_TO_P_BLOCK_TAGS = [
  'a',
  'blockquote',
  'dl',
  'div',
  'img',
  'p',
  'pre',
  'table',
].join(',');
module.exports.DIV_TO_P_BLOCK_TAGS = DIV_TO_P_BLOCK_TAGS;

// A list of tags that should be ignored when trying to find the top candidate
// for a document.
const NON_TOP_CANDIDATE_TAGS = [
  'br',
  'b',
  'i',
  'label',
  'hr',
  'area',
  'base',
  'basefont',
  'input',
  'img',
  'link',
  'meta',
];
module.exports.NON_TOP_CANDIDATE_TAGS = NON_TOP_CANDIDATE_TAGS;

,
  'i'
);
module.exports.NON_TOP_CANDIDATE_TAGS_RE = NON_TOP_CANDIDATE_TAGS_RE;

// A list of selectors that specify, very clearly, either hNews or other
// very content-specific style content, like Blogger templates.
// More examples here: http://microformats.org/wiki/blog-post-formats
const HNEWS_CONTENT_SELECTORS = [
  ['.hentry', '.entry-content'],
  ['entry', '.entry-content'],
  ['.entry', '.entry_content'],
  ['.post', '.postbody'],
  ['.post', '.post_body'],
  ['.post', '.post-body'],
];
module.exports.HNEWS_CONTENT_SELECTORS = HNEWS_CONTENT_SELECTORS;

const PHOTO_HINTS = ['figure', 'photo', 'image', 'caption'];
module.exports.PHOTO_HINTS = PHOTO_HINTS;
const PHOTO_HINTS_RE = new RegExp(PHOTO_HINTS.join('|'), 'i');
module.exports.PHOTO_HINTS_RE = PHOTO_HINTS_RE;

// A list of strings that denote a positive scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const POSITIVE_SCORE_HINTS = [
  'article',
  'articlecontent',
  'instapaper_body',
  'blog',
  'body',
  'content',
  'entry-content-asset',
  'entry',
  'hentry',
  'main',
  'Normal',
  'page',
  'pagination',
  'permalink',
  'post',
  'story',
  'text',
  '[-_]copy', // usatoday
  '\\Bcopy',
];
module.exports.POSITIVE_SCORE_HINTS = POSITIVE_SCORE_HINTS;

// The above list, joined into a matching regular expression
const POSITIVE_SCORE_RE = new RegExp(
  POSITIVE_SCORE_HINTS.join('|'),
  'i'
);
module.exports.POSITIVE_SCORE_RE = POSITIVE_SCORE_RE;

// Readability publisher-specific guidelines
const READABILITY_ASSET = new RegExp('entry-content-asset', 'i');
module.exports.READABILITY_ASSET = READABILITY_ASSET;

// A list of strings that denote a negative scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const NEGATIVE_SCORE_HINTS = [
  'adbox',
  'advert',
  'author',
  'bio',
  'bookmark',
  'bottom',
  'byline',
  'clear',
  'com-',
  'combx',
  'comment',
  'comment\\B',
  'contact',
  'copy',
  'credit',
  'crumb',
  'date',
  'deck',
  'excerpt',
  'featured', // tnr.com has a featured_content which throws us off
  'foot',
  'footer',
  'footnote',
  'graf',
  'head',
  'info',
  'infotext', // newscientist.com copyright
  'instapaper_ignore',
  'jump',
  'linebreak',
  'link',
  'masthead',
  'media',
  'meta',
  'modal',
  'outbrain', // slate.com junk
  'promo',
  'pr_', // autoblog - press release
  'related',
  'respond',
  'roundcontent', // lifehacker restricted content warning
  'scroll',
  'secondary',
  'share',
  'shopping',
  'shoutbox',
  'side',
  'sidebar',
  'sponsor',
  'stamp',
  'sub',
  'summary',
  'tags',
  'tools',
  'widget',
];
module.exports.NEGATIVE_SCORE_HINTS = NEGATIVE_SCORE_HINTS;
// The above list, joined into a matching regular expression
const NEGATIVE_SCORE_RE = new RegExp(
  NEGATIVE_SCORE_HINTS.join('|'),
  'i'
);
module.exports.NEGATIVE_SCORE_RE = NEGATIVE_SCORE_RE;

// Match a digit. Pretty clear.
const DIGIT_RE = new RegExp('[0-9]');
module.exports.DIGIT_RE = DIGIT_RE;

// Match 2 or more consecutive <br> tags
const BR_TAGS_RE = new RegExp('(<br[^>]*>[ \n\r\t]*){2,}', 'i');
module.exports.BR_TAGS_RE = BR_TAGS_RE;

// Match 1 BR tag.
const BR_TAG_RE = new RegExp('<br[^>]*>', 'i');
module.exports.BR_TAG_RE = BR_TAG_RE;

// A list of all of the block level tags known in HTML5 and below. Taken from
// http://bit.ly/qneNIT
const BLOCK_LEVEL_TAGS = [
  'article',
  'aside',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'col',
  'colgroup',
  'dd',
  'div',
  'dl',
  'dt',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'li',
  'map',
  'object',
  'ol',
  'output',
  'p',
  'pre',
  'progress',
  'section',
  'table',
  'tbody',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
  'video',
];
module.exports.BLOCK_LEVEL_TAGS = BLOCK_LEVEL_TAGS;
const BLOCK_LEVEL_TAGS_RE = new RegExp(
  `^(${BLOCK_LEVEL_TAGS.join('|')})// // CONTENT FETCHING CONSTANTS ////

// A list of strings that can be considered unlikely candidates when
// extracting content from a resource. These strings are joined together
// and then tested for existence using re:test, so may contain simple,
// non-pipe style regular expression queries if necessary.
const UNLIKELY_CANDIDATES_BLACKLIST = [
  'ad-break',
  'adbox',
  'advert',
  'addthis',
  'agegate',
  'aux',
  'blogger-labels',
  'combx',
  'comment',
  'conversation',
  'disqus',
  'entry-unrelated',
  'extra',
  'foot',
  'form',
  'header',
  'hidden',
  'loader',
  'login', // Note: This can hit 'blogindex'.
  'menu',
  'meta',
  'nav',
  'pager',
  'pagination',
  'predicta', // readwriteweb inline ad box
  'presence_control_external', // lifehacker.com container full of false positives
  'popup',
  'printfriendly',
  'related',
  'remove',
  'remark',
  'rss',
  'share',
  'shoutbox',
  'sidebar',
  'sociable',
  'sponsor',
  'tools',
];
module.exports.UNLIKELY_CANDIDATES_BLACKLIST = UNLIKELY_CANDIDATES_BLACKLIST;

// A list of strings that can be considered LIKELY candidates when
// extracting content from a resource. Essentially, the inverse of the
// blacklist above - if something matches both blacklist and whitelist,
// it is kept. This is useful, for example, if something has a className
// of "rss-content entry-content". It matched 'rss', so it would normally
// be removed, however, it's also the entry content, so it should be left
// alone.
//
// These strings are joined together and then tested for existence using
// re:test, so may contain simple, non-pipe style regular expression queries
// if necessary.
const UNLIKELY_CANDIDATES_WHITELIST = [
  'and',
  'article',
  'body',
  'blogindex',
  'column',
  'content',
  'entry-content-asset',
  'format', // misuse of form
  'hfeed',
  'hentry',
  'hatom',
  'main',
  'page',
  'posts',
  'shadow',
];
module.exports.UNLIKELY_CANDIDATES_WHITELIST = UNLIKELY_CANDIDATES_WHITELIST;

// A list of tags which, if found inside, should cause a <div /> to NOT
// be turned into a paragraph tag. Shallow div tags without these elements
// should be turned into <p /> tags.
const DIV_TO_P_BLOCK_TAGS = [
  'a',
  'blockquote',
  'dl',
  'div',
  'img',
  'p',
  'pre',
  'table',
].join(',');
module.exports.DIV_TO_P_BLOCK_TAGS = DIV_TO_P_BLOCK_TAGS;

// A list of tags that should be ignored when trying to find the top candidate
// for a document.
const NON_TOP_CANDIDATE_TAGS = [
  'br',
  'b',
  'i',
  'label',
  'hr',
  'area',
  'base',
  'basefont',
  'input',
  'img',
  'link',
  'meta',
];
module.exports.NON_TOP_CANDIDATE_TAGS = NON_TOP_CANDIDATE_TAGS;

const NON_TOP_CANDIDATE_TAGS_RE = new RegExp(
  `^(${NON_TOP_CANDIDATE_TAGS.join('|')})// // CONTENT FETCHING CONSTANTS ////

// A list of strings that can be considered unlikely candidates when
// extracting content from a resource. These strings are joined together
// and then tested for existence using re:test, so may contain simple,
// non-pipe style regular expression queries if necessary.
const UNLIKELY_CANDIDATES_BLACKLIST = [
  'ad-break',
  'adbox',
  'advert',
  'addthis',
  'agegate',
  'aux',
  'blogger-labels',
  'combx',
  'comment',
  'conversation',
  'disqus',
  'entry-unrelated',
  'extra',
  'foot',
  'form',
  'header',
  'hidden',
  'loader',
  'login', // Note: This can hit 'blogindex'.
  'menu',
  'meta',
  'nav',
  'pager',
  'pagination',
  'predicta', // readwriteweb inline ad box
  'presence_control_external', // lifehacker.com container full of false positives
  'popup',
  'printfriendly',
  'related',
  'remove',
  'remark',
  'rss',
  'share',
  'shoutbox',
  'sidebar',
  'sociable',
  'sponsor',
  'tools',
];
module.exports.UNLIKELY_CANDIDATES_BLACKLIST = UNLIKELY_CANDIDATES_BLACKLIST;

// A list of strings that can be considered LIKELY candidates when
// extracting content from a resource. Essentially, the inverse of the
// blacklist above - if something matches both blacklist and whitelist,
// it is kept. This is useful, for example, if something has a className
// of "rss-content entry-content". It matched 'rss', so it would normally
// be removed, however, it's also the entry content, so it should be left
// alone.
//
// These strings are joined together and then tested for existence using
// re:test, so may contain simple, non-pipe style regular expression queries
// if necessary.
const UNLIKELY_CANDIDATES_WHITELIST = [
  'and',
  'article',
  'body',
  'blogindex',
  'column',
  'content',
  'entry-content-asset',
  'format', // misuse of form
  'hfeed',
  'hentry',
  'hatom',
  'main',
  'page',
  'posts',
  'shadow',
];
module.exports.UNLIKELY_CANDIDATES_WHITELIST = UNLIKELY_CANDIDATES_WHITELIST;

// A list of tags which, if found inside, should cause a <div /> to NOT
// be turned into a paragraph tag. Shallow div tags without these elements
// should be turned into <p /> tags.
const DIV_TO_P_BLOCK_TAGS = [
  'a',
  'blockquote',
  'dl',
  'div',
  'img',
  'p',
  'pre',
  'table',
].join(',');
module.exports.DIV_TO_P_BLOCK_TAGS = DIV_TO_P_BLOCK_TAGS;

// A list of tags that should be ignored when trying to find the top candidate
// for a document.
const NON_TOP_CANDIDATE_TAGS = [
  'br',
  'b',
  'i',
  'label',
  'hr',
  'area',
  'base',
  'basefont',
  'input',
  'img',
  'link',
  'meta',
];
module.exports.NON_TOP_CANDIDATE_TAGS = NON_TOP_CANDIDATE_TAGS;

,
  'i'
);
module.exports.NON_TOP_CANDIDATE_TAGS_RE = NON_TOP_CANDIDATE_TAGS_RE;

// A list of selectors that specify, very clearly, either hNews or other
// very content-specific style content, like Blogger templates.
// More examples here: http://microformats.org/wiki/blog-post-formats
const HNEWS_CONTENT_SELECTORS = [
  ['.hentry', '.entry-content'],
  ['entry', '.entry-content'],
  ['.entry', '.entry_content'],
  ['.post', '.postbody'],
  ['.post', '.post_body'],
  ['.post', '.post-body'],
];
module.exports.HNEWS_CONTENT_SELECTORS = HNEWS_CONTENT_SELECTORS;

const PHOTO_HINTS = ['figure', 'photo', 'image', 'caption'];
module.exports.PHOTO_HINTS = PHOTO_HINTS;
const PHOTO_HINTS_RE = new RegExp(PHOTO_HINTS.join('|'), 'i');
module.exports.PHOTO_HINTS_RE = PHOTO_HINTS_RE;

// A list of strings that denote a positive scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const POSITIVE_SCORE_HINTS = [
  'article',
  'articlecontent',
  'instapaper_body',
  'blog',
  'body',
  'content',
  'entry-content-asset',
  'entry',
  'hentry',
  'main',
  'Normal',
  'page',
  'pagination',
  'permalink',
  'post',
  'story',
  'text',
  '[-_]copy', // usatoday
  '\\Bcopy',
];
module.exports.POSITIVE_SCORE_HINTS = POSITIVE_SCORE_HINTS;

// The above list, joined into a matching regular expression
const POSITIVE_SCORE_RE = new RegExp(
  POSITIVE_SCORE_HINTS.join('|'),
  'i'
);
module.exports.POSITIVE_SCORE_RE = POSITIVE_SCORE_RE;

// Readability publisher-specific guidelines
const READABILITY_ASSET = new RegExp('entry-content-asset', 'i');
module.exports.READABILITY_ASSET = READABILITY_ASSET;

// A list of strings that denote a negative scoring for this content as being
// an article container. Checked against className and id.
//
// TODO: Perhaps have these scale based on their odds of being quality?
const NEGATIVE_SCORE_HINTS = [
  'adbox',
  'advert',
  'author',
  'bio',
  'bookmark',
  'bottom',
  'byline',
  'clear',
  'com-',
  'combx',
  'comment',
  'comment\\B',
  'contact',
  'copy',
  'credit',
  'crumb',
  'date',
  'deck',
  'excerpt',
  'featured', // tnr.com has a featured_content which throws us off
  'foot',
  'footer',
  'footnote',
  'graf',
  'head',
  'info',
  'infotext', // newscientist.com copyright
  'instapaper_ignore',
  'jump',
  'linebreak',
  'link',
  'masthead',
  'media',
  'meta',
  'modal',
  'outbrain', // slate.com junk
  'promo',
  'pr_', // autoblog - press release
  'related',
  'respond',
  'roundcontent', // lifehacker restricted content warning
  'scroll',
  'secondary',
  'share',
  'shopping',
  'shoutbox',
  'side',
  'sidebar',
  'sponsor',
  'stamp',
  'sub',
  'summary',
  'tags',
  'tools',
  'widget',
];
module.exports.NEGATIVE_SCORE_HINTS = NEGATIVE_SCORE_HINTS;
// The above list, joined into a matching regular expression
const NEGATIVE_SCORE_RE = new RegExp(
  NEGATIVE_SCORE_HINTS.join('|'),
  'i'
);
module.exports.NEGATIVE_SCORE_RE = NEGATIVE_SCORE_RE;

// Match a digit. Pretty clear.
const DIGIT_RE = new RegExp('[0-9]');
module.exports.DIGIT_RE = DIGIT_RE;

// Match 2 or more consecutive <br> tags
const BR_TAGS_RE = new RegExp('(<br[^>]*>[ \n\r\t]*){2,}', 'i');
module.exports.BR_TAGS_RE = BR_TAGS_RE;

// Match 1 BR tag.
const BR_TAG_RE = new RegExp('<br[^>]*>', 'i');
module.exports.BR_TAG_RE = BR_TAG_RE;

// A list of all of the block level tags known in HTML5 and below. Taken from
// http://bit.ly/qneNIT
const BLOCK_LEVEL_TAGS = [
  'article',
  'aside',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'col',
  'colgroup',
  'dd',
  'div',
  'dl',
  'dt',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'li',
  'map',
  'object',
  'ol',
  'output',
  'p',
  'pre',
  'progress',
  'section',
  'table',
  'tbody',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
  'video',
];
module.exports.BLOCK_LEVEL_TAGS = BLOCK_LEVEL_TAGS;
,
  'i'
);
module.exports.BLOCK_LEVEL_TAGS_RE = BLOCK_LEVEL_TAGS_RE;

// The removal is implemented as a blacklist and whitelist, this test finds
// blacklisted elements that aren't whitelisted. We do this all in one
// expression-both because it's only one pass, and because this skips the
// serialization for whitelisted nodes.
const candidatesBlacklist = UNLIKELY_CANDIDATES_BLACKLIST.join('|');
const CANDIDATES_BLACKLIST = new RegExp(candidatesBlacklist, 'i');
module.exports.CANDIDATES_BLACKLIST = CANDIDATES_BLACKLIST;

const candidatesWhitelist = UNLIKELY_CANDIDATES_WHITELIST.join('|');
const CANDIDATES_WHITELIST = new RegExp(candidatesWhitelist, 'i');
module.exports.CANDIDATES_WHITELIST = CANDIDATES_WHITELIST;

const UNLIKELY_RE = new RegExp(
  `!(${candidatesWhitelist})|(${candidatesBlacklist})`,
  'i'
);
module.exports.UNLIKELY_RE = UNLIKELY_RE;

const PARAGRAPH_SCORE_TAGS = new RegExp('^(p|li|span|pre)
const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)
const BAD_TAGS = new RegExp('^(address|form)

const HTML_OR_BODY_RE = new RegExp('^(html|body)
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.CHILD_CONTENT_TAGS = CHILD_CONTENT_TAGS;
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.BAD_TAGS = BAD_TAGS;

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.CHILD_CONTENT_TAGS = CHILD_CONTENT_TAGS;
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.HTML_OR_BODY_RE = HTML_OR_BODY_RE;
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.CHILD_CONTENT_TAGS = CHILD_CONTENT_TAGS;
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.BAD_TAGS = BAD_TAGS;

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.CHILD_CONTENT_TAGS = CHILD_CONTENT_TAGS;
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
, 'i');
module.exports.PARAGRAPH_SCORE_TAGS = PARAGRAPH_SCORE_TAGS;
export const CHILD_CONTENT_TAGS = new RegExp('^(td|blockquote|ol|ul|dl)$', 'i');
export const BAD_TAGS = new RegExp('^(address|form)$', 'i');

export const HTML_OR_BODY_RE = new RegExp('^(html|body)$', 'i');
