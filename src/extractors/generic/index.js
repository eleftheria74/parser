const cheerio = require('cheerio');
const stringDirection = require('string-direction');

const GenericContentExtractor = require('./content/extractor');
const GenericTitleExtractor = require('./title/extractor');
const GenericAuthorExtractor = require('./author/extractor');
const GenericDatePublishedExtractor = require('./date-published/extractor');
const GenericDekExtractor = require('./dek/extractor');
const GenericLeadImageUrlExtractor = require('./lead-image-url/extractor');
const GenericNextPageUrlExtractor = require('./next-page-url/extractor');
const GenericUrlExtractor = require('./url/extractor');
const GenericExcerptExtractor = require('./excerpt/extractor');
const GenericWordCountExtractor = require('./word-count/extractor');

const GenericExtractor = {
  // This extractor is the default for all domains
  domain: '*',
  title: GenericTitleExtractor.extract,
  date_published: GenericDatePublishedExtractor.extract,
  author: GenericAuthorExtractor.extract,
  content: GenericContentExtractor.extract.bind(GenericContentExtractor),
  lead_image_url: GenericLeadImageUrlExtractor.extract,
  dek: GenericDekExtractor.extract,
  next_page_url: GenericNextPageUrlExtractor.extract,
  url_and_domain: GenericUrlExtractor.extract,
  excerpt: GenericExcerptExtractor.extract,
  word_count: GenericWordCountExtractor.extract,
  direction: ({ title }) => stringDirection.getDirection(title),

  extract(options) {
    const { html, $ } = options;

    if (html && !$) {
      const loaded = cheerio.load(html);
      options.$ = loaded;
    }

    const title = this.title(options);
    const date_published = this.date_published(options);
    const author = this.author(options);
    const content = this.content({ ...options, title });
    const lead_image_url = this.lead_image_url({ ...options, content });
    const dek = this.dek({ ...options, content });
    const next_page_url = this.next_page_url(options);
    const excerpt = this.excerpt({ ...options, content });
    const word_count = this.word_count({ ...options, content });
    const direction = this.direction({ title });
    const { url, domain } = this.url_and_domain(options);

    return {
      title,
      author,
      date_published: date_published || null,
      dek,
      lead_image_url,
      content,
      next_page_url,
      url,
      domain,
      excerpt,
      word_count,
      direction,
    };
  },
};

module.exports = GenericExtractor;
