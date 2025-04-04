const TimesofindiaIndiatimesComExtractor = {
  domain: 'timesofindia.indiatimes.com',

  title: {
    selectors: ['h1'],
  },

  extend: {
    reporter: {
      selectors: ['div.byline'],
      transforms: {},
    },
  },

  date_published: {
    selectors: ['.byline'],
    format: 'MMM D, YYYY, HH:mm z',
    timezone: 'Asia/Kolkata',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.contentwrapper:has(section)'],
    defaultCleaner: false,

    clean: [
      'section',
      'h1',
      '.byline',
      '.img_cptn',
      '.icon_share_wrap',
      'ul[itemtype="https://schema.org/BreadcrumbList"]',
    ],
  },
};
module.exports.TimesofindiaIndiatimesComExtractor = TimesofindiaIndiatimesComExtractor;
