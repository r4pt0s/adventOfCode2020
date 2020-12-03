const { input } = require("../../helperscripts/loadInput");
const { calculateTreesFound } = require("../shared/functions");
const loadedInput = input("./input.txt");

const directions = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const answer = directions.reduce(
  (total, { right, down }) =>
    total * calculateTreesFound([...loadedInput], right, down),
  1
);

console.log(
  `What do you get if you multiply together the number of trees encountered on each of the listed slopes => ${answer}`
);
