const { rawInput } = require("../../helperscripts/loadInput");
const { invalidNumber } = require("../puz1/index");
const loadedInput = rawInput("./input.txt");

const contiguousSet = (encryptedData, invalid) => {
  const seriesOfNumbers = encryptedData.split("\n").map(Number);
  let found = false;
  let skipIndex = 0;

  while (!found) {
    const list = [];
    let valueCheck = 0;

    for (let i = skipIndex; i < seriesOfNumbers.length; i++) {
      valueCheck += seriesOfNumbers[i];
      list.push(seriesOfNumbers[i]);
      if (valueCheck > invalid) {
        break;
      } else if (valueCheck === invalid) {
        return list;
      }
    }

    skipIndex++;
  }
};

const potentialList = contiguousSet(loadedInput, invalidNumber);
const encryptionWeakness =
  Math.min(...potentialList) + Math.max(...potentialList);

console.log(
  `What is the encryption weakness in your XMAS-encrypted list of numbers => ${encryptionWeakness}`
);
