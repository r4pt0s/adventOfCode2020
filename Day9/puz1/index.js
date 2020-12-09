const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");

const addTogether = (input) => {
  const arr = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      arr.push(input[i] + input[j]);
    }
  }

  return arr;
};
const XMASDecipher = (encryptedData, preamble) => {
  const seriesOfNumbers = encryptedData.split("\n").map(Number);
  const chunked = [];

  for (let i = 0; i < seriesOfNumbers.length - preamble + 1; i++) {
    const collector = [];
    for (let j = i; j < i + preamble; j++) {
      collector.push(seriesOfNumbers[j]);
    }
    chunked.push(collector);
  }

  for (let i = 0; i < chunked.length; i++) {
    const sumOf = addTogether(chunked[i]);

    if (sumOf.includes(chunked[i + 1][preamble - 1])) {
    } else {
      return chunked[i + 1][preamble - 1];
    }
  }
};

const answer = XMASDecipher(loadedInput, 25);

console.log(
  `What is the first number that does not have this property => ${answer}`
);

module.exports = {
  invalidNumber: answer,
};
