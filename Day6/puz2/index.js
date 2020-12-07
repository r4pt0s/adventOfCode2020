const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");
const answergroups = loadedInput.replace(/\s/gm, "-").split("--");

const answersByGroup = answergroups.map((answers) => answers.split("-"));

let total = answersByGroup.reduce((everyoneCount, answerSequence) => {
  const declarationForm = {};

  answerSequence.forEach((answers) => {
    declarationForm.groupPersonCount = answerSequence.length;
    answers.split("").forEach((question) => {
      if (!declarationForm[question]) {
        declarationForm[question] = { answeredYes: 1 };
      } else {
        declarationForm[question].answeredYes++;
      }

      if (
        declarationForm[question].answeredYes ===
        declarationForm.groupPersonCount
      ) {
        everyoneCount++;
      }
    });
  });
  return everyoneCount;
}, 0);

console.log(`What is the sum of those counts => ${total}`);
