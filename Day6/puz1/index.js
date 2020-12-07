const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");
const answergroups = loadedInput.replace(/\s/gm, "-").split("--");

const answersByGroup = answergroups.map((answers) =>
  answers.replace(/(-)/g, "")
);

const total = answersByGroup.reduce((answeredYes, answerSequence) => {
  const declarationForm = {};

  answerSequence.split("").forEach((char) => {
    if (!declarationForm[char]) {
      declarationForm[char] = { occ: true };
      answeredYes++;
    }
  });

  return answeredYes;
}, 0);

console.log(`What is the sum of those counts => ${total}`);
