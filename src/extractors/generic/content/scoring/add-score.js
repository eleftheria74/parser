module.exports = async function addScore($node, $, amount) {
  try {
    // Χρησιμοποιούμε dynamic imports για να καθυστερήσουμε τη φόρτωση
    const { default: getOrInitScore } = await import('./get-or-init-score');
    const { default: setScore } = await import('./set-score');

    const score = getOrInitScore($node, $) + amount;
    setScore($node, $, score);
  } catch (e) {
    // Ignoring; error occurs in scoreNode
  }

  return $node;
}
