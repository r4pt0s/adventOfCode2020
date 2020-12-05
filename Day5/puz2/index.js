const { idList } = require("../puz1/index");
const sorted = idList.sort();
let missingId = 0;

for (let i = 1; i < sorted.length - 1; i++) {
  const missingSeat = Number(sorted[i]) + 1;
  if (missingSeat !== sorted[i + 1]) {
    missingId = missingSeat;
  }
}

console.log(`What is the ID of your seat => ${missingId}`);
