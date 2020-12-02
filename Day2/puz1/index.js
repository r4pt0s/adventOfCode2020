/**
 * For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
 * 1-3 a: abcde
 *
 * The password, cdefg, is not; it contains no instances of b, but needs at least 1
 * 1-3 b: cdefg
 */

const { input } = require("../../helperscripts/loadInput");
const loadedInput = input("./input.txt");

const createStructuredObject = (row) => {
  const [instructionRaw, password] = row.split(": ");
  const [policy, character] = instructionRaw.split(" ");
  const [min, max] = policy.split("-");
  const instructions = { policy: { max, min }, character };

  return { instructions, password };
};

const answer = loadedInput.reduce((validPasswords, currRow) => {
  const {
    instructions: {
      policy: { min, max },
      character,
    },
    password,
  } = createStructuredObject(currRow);
  if (password) {
    const regex = new RegExp(character, "g");
    const count = password.match(regex)?.length || 0;

    if (count >= min && count <= max) {
      validPasswords++;
    }
  }

  return validPasswords;
}, 0);

console.log(answer);
