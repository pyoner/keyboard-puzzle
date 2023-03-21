// helpers.js
export function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function maskLabel(obj) {
  return { ...obj, label: obj.label.replace(/./g, '*') };
}

export function isMasked(key) {
  return key.label.includes('*');
}

export function countMatchingKeys(a, b) {
  let count = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i].label === b[i].label) {
      count++;
    }
  }

  return count;
}

export function copyKeys(keys) {
  return keys.map(key => ({...key}));
}
