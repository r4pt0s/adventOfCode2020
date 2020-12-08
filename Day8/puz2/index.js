const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");

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

let res = { failed: true };
for (let i = 0; i < instructionArray.length; i++) {
  const replacer = { jmp: "nop", nop: "jmp", acc: "acc" };
  const code = [...instructionArray];
  code[i] = { ...code[i], instruction: replacer[code[i].instruction] };
  if (res.failed) {
    res = runProgramm(code);
  } else {
    break;
  }
}

console.log(`what value is in the accumulator => ${res.acc}`);
