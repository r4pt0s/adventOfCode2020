// O(n)
const addPathPoints = (mapRow, neededPoints) => {
  const newMap = [...mapRow];

  while (neededPoints) {
    newMap.push(...mapRow);
    neededPoints--;
  }

  return [...newMap];
};

// O(n)
const calculateTreesFound = (map, moveRight, moveDown) => {
  const direction = { right: moveRight, down: moveDown };
  let right = 0;
  const maxRows = map.length;
  let noOfTrees = 0;
  let repeatRow = 0;

  for (let i = 0; i <= maxRows; right += direction.right, i += direction.down) {
    if (map[i]) {
      if (right >= map[i].length || repeatRow) {
        repeatRow++;
        map[i] = addPathPoints([...map[i]], repeatRow);
      }

      if (map[i][right] === "#") {
        noOfTrees++;
      }
    }
  }

  return noOfTrees;
};

module.exports = {
  calculateTreesFound,
};
