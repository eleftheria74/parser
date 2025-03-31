module.exports = {
  getWeight: async () => (await import('./get-weight')).default,
  getScore: async () => (await import('./get-score')).default,
  scoreCommas: async () => (await import('./score-commas')).default,
  scoreLength: async () => (await import('./score-length')).default,
  scoreParagraph: async () => (await import('./score-paragraph')).default,
  setScore: async () => (await import('./set-score')).default,
  addScore: async () => (await import('./add-score')).default,
  addToParent: async () => (await import('./add-to-parent')).default,
  getOrInitScore: async () => (await import('./get-or-init-score')).default,
  scoreNode: async () => (await import('./score-node')).default,
  scoreContent: async () => (await import('./score-content')).default,
  findTopCandidate: async () => (await import('./find-top-candidate')).default,
};
