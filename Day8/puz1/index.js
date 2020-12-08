const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");
/* const loadedInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
 */
const createMapItems = (instruction) => {
  const parts = instruction.split(" ");

  return { instruction: parts[0], toDo: Number(parts[1]) };
};

const instructionArray = loadedInput.split("\n").map(createMapItems);

const runProgramm = (bootCode) => {
  let singleInstruction = bootCode[0];
  let instructionIndex = 0;
  let acc = 0;
  const indexStore = [];

  while (singleInstruction) {
    if (indexStore.includes(instructionIndex)) {
      return { failed: true, acc };
    }

    indexStore.push(instructionIndex);

    switch (singleInstruction.instruction) {
      case "nop":
        instructionIndex++;
        break;
      case "jmp":
        instructionIndex += singleInstruction.toDo;
        break;
      case "acc":
        acc += singleInstruction.toDo;

        instructionIndex++;
        break;
      default:
        break;
    }

    singleInstruction = bootCode[instructionIndex];
  }

  return { failed: false, acc };
};

const result = runProgramm(instructionArray);

console.log(`what value is in the accumulator => ${result.acc}`);
