const { input } = require("../../helperscripts/loadInput");
const loadedInput = input("./input.txt");

//Naive approach O(n^3)
loadedInput.forEach((num1) => {
  loadedInput.forEach((num2) => {
    loadedInput.forEach((num3) => {
      if (Number(num1) + Number(num2) + Number(num3) === 2020) {
        console.log(`match ${num1}+${num2}+${num3}=2020`);
        console.log(`solution ${Number(num1) * Number(num2) * Number(num3)}`);
      }
    });
  });
});
