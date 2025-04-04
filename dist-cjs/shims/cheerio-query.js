const jQuery = require("jquery");
const PARSER_CLASS = "mercury-parsing-container";
let PARSING_NODE;
jQuery.noConflict();
const $ = (selector, context, rootjQuery, contextOverride = true) => {
  if (contextOverride) {
    if (context && typeof context === "string") {
      context = PARSING_NODE.find(context);
    } else if (!context) {
      context = PARSING_NODE;
    }
  }
  return new jQuery.fn.init(selector, context, rootjQuery);
};
$.fn = $.prototype = jQuery.fn;
jQuery.extend($, jQuery);
const removeUnusedTags = ($node) => {
  $node.find('script, style, link[rel="stylesheet"]').remove();
  return $node;
};
$.cloneHtml = () => {
  const html = removeUnusedTags($("html", null, null, false).clone());
  return html.children().wrap("<div />").wrap("<div />");
};
$.root = () => $("*").first();
$.browser = true;
const isContainer = ($node) => {
  const el = $node.get(0);
  if (el && el.tagName) {
    return el.tagName.toLowerCase() === "container";
  }
  return false;
};
$.html = ($node) => {
  if ($node) {
    if (isContainer($node) || isContainer($node.children("container"))) {
      return $node.children("container").html() || $node.html();
    }
    return $("<div>").append($node.eq(0).clone()).html();
  }
  const $body = removeUnusedTags($("body", null, null, false).clone());
  const $head = removeUnusedTags($("head", null, null, false).clone());
  if (PARSING_NODE && PARSING_NODE.length > 0) {
    return PARSING_NODE.children().html();
  }
  const html = $("<container />").append($(`<container>${$head.html()}</container>`)).append($(`<container>${$body.html()}</container>`)).wrap("<container />").parent().html();
  return html;
};
$.load = (html, opts = {}, returnHtml = false) => {
  if (!html) {
    html = $.cloneHtml();
  } else {
    html = $("<container />").html(html);
  }
  PARSING_NODE = PARSING_NODE || $(`<div class="${PARSER_CLASS}" style="display:none;" />`);
  html = removeUnusedTags(html);
  html.find("*").contents().each(function() {
    if (this.nodeType === Node.COMMENT_NODE) {
      $(this).remove();
    }
  });
  PARSING_NODE.html(html);
  if (returnHtml)
    return { $, html: html.html() };
  return $;
};
module.exports = $;
