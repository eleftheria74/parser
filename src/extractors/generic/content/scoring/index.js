// Scoring
module.exports = {
  getWeight: require('./get-weight').default,
  getScore: require('./get-score').default,
  scoreCommas: require('./score-commas').default,
  scoreLength: require('./score-length').default,
  scoreParagraph: require('./score-paragraph').default,
  setScore: require('./set-score').default,
  addScore: require('./add-score').default,
  addToParent: require('./add-to-parent').default,
  getOrInitScore: require('./get-or-init-score').default,
  scoreNode: require('./score-node').default,
  scoreContent: require('./score-content').default,
  findTopCandidate: require('./find-top-candidate').default,
};
