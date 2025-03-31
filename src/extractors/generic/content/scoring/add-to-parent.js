module.exports = async function addToParent(node, $, score) {
  // Dynamic import για το addScore
  const addScore = (await import('./add-score')).default;

  const parent = node.parent();
  if (parent) {
    addScore(parent, $, score * 0.25);
  }

  return node;
};
