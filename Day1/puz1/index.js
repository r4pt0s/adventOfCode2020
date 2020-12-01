const { input } = require("../../Helperscripts/loadInput");
const loadedInput = input("./input1.txt");

//Naive approach O(n^2)
loadedInput.forEach((num1) => {
  loadedInput.forEach((num2) => {
    if (Number(num1) + Number(num2) === 2020) {
      console.log(`match ${num1}+${num2}=2020`);
      console.log(`solution ${Number(num1) * Number(num2)}`);
    }
  });
});
