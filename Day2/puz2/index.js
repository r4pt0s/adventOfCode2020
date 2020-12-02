/**
 * 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
 * 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
 * 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
 */

const { input } = require("../../helperscripts/loadInput");
const loadedInput = input("./input.txt");

const createStructuredObject = (row) => {
  const [instructionRaw, password] = row.split(": ");
  const [policy, character] = instructionRaw.split(" ");
  const [pos1, pos2] = policy.split("-");
  const instructions = { policy: { pos1, pos2 }, character };

  return { instructions, password };
};

const answer = loadedInput.reduce((validPasswords, currRow) => {
  const {
    instructions: {
      policy: { pos1, pos2 },
      character,
    },
    password,
  } = createStructuredObject(currRow);
  if (password) {
    if (
      (password[pos1 - 1] === character && password[pos2 - 1] !== character) ||
      (password[pos1 - 1] !== character && password[pos2 - 1] === character)
    ) {
      validPasswords++;
    }
  }

  return validPasswords;
}, 0);

console.log(answer);
