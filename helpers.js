const checkEquivalence = (a, b) => {
  if (a.length !== b.length) return false;

  return true;
};

const checkEquality = (a, b) => {
  if (a.length !== b.length) return false;

  if (a[0].id !== b[0].id) return false;

  return true;
};

const checkSubset = (a, b) => {
  if (b.length > a.length) return false;
  return true;
};

const checkDisjoint = (a, b) => {
  if (a[0].id === b[0].id) return false;
  return true;
};

const checkComplete = (a, b, c) => {
  if (c.length === a.length + b.length) return true;
  return false;
};

const checkDifference = (a, b) => (JSON.stringify(a) !== JSON.stringify(b));

module.exports = {
  checkEquivalence,
  checkEquality,
  checkSubset,
  checkDisjoint,
  checkComplete,
  checkDifference,
};
