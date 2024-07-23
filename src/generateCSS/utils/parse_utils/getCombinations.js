export const getCombinations = (arrays) => {
  let results = [[]];

  for (let i = 0; i < arrays.length; i++) {
    const currentArray = arrays[i];
    const newResults = [];

    results.forEach((result) => {
      currentArray.forEach((item) => {
        newResults.push(result.concat(item));
      });
    });

    results = newResults;
  }
  return results;
};
