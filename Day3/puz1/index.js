const { input } = require("../../helperscripts/loadInput");
const { calculateTreesFound } = require("../shared/functions");
const loadedInput = input("./input.txt");

console.log(
  `how many trees would you encounter => ${calculateTreesFound(
    [...loadedInput],
    3,
    1
  )}`
);
