const PastebinComExtractor = {
  domain: 'pastebin.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.username', '.paste_box_line2 .t_us + a'],
  },

  date_published: {
    selectors: ['.date', '.paste_box_line2 .t_da + span'],
    timezone: 'America/New_York',
    format: 'MMMM D, YYYY',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.source', '#selectable .text'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      ol: 'div',
      li: 'p',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
module.exports.PastebinComExtractor = PastebinComExtractor;
