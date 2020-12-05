const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt").split("\n");

const startBoundaryRow = { F: 0, B: 127 };
const startBoundaryColumn = { L: 0, R: 7 };

const calculateSeat = (instruction, boundary, lower, upper) => {
  const inside = { ...boundary };
  switch (instruction) {
    case "F":
    case "L":
      inside[upper] = Math.floor((inside[lower] + inside[upper]) / 2);
      break;
    case "B":
    case "R":
      inside[lower] = Math.ceil((inside[lower] + inside[upper]) / 2);
      break;
    default:
      break;
  }

  return { ...inside, found: inside[lower] === inside[upper] };
};

const idList = loadedInput.reduce((ids, seat) => {
  let useRowBoundary = { ...startBoundaryRow };
  let useColumnBoundary = { ...startBoundaryColumn };
  const [_, rowInstructions, columnInstructions] = seat.split(
    /(\w{7})(\w{3})/i
  );

  for (let i = 0; i < rowInstructions.length; i++) {
    useRowBoundary = calculateSeat(
      rowInstructions[i],
      useRowBoundary,
      "F",
      "B"
    );
    if (useRowBoundary?.found) {
      break;
    }
  }

  for (let i = 0; i < columnInstructions.length; i++) {
    useColumnBoundary = calculateSeat(
      columnInstructions[i],
      useColumnBoundary,
      "L",
      "R"
    );
    if (useColumnBoundary?.found) {
      break;
    }
  }

  ids.push(useRowBoundary.F * 8 + useColumnBoundary.L);

  return ids;
}, []);

console.log(
  ` What is the highest seat ID on a boarding pass => ${Math.max(...idList)}`
);

module.exports = {
  idList,
};
