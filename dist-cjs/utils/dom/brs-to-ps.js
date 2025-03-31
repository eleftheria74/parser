const paragraphize = require("./paragraphize");
module.exports = function brsToPs($) {
  let collapsing = false;
  $("br").each((index, element) => {
    const $element = $(element);
    const nextElement = $element.next().get(0);
    if (nextElement && nextElement.tagName.toLowerCase() === "br") {
      collapsing = true;
      $element.remove();
    } else if (collapsing) {
      collapsing = false;
      paragraphize(element, $, true);
    }
  });
  return $;
};
