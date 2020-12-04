const { rawInput } = require("../../helperscripts/loadInput");
const loadedInput = rawInput("./input.txt");

const passports = loadedInput.replace(/\s/gm, "-").split("--");

const extractedPassportData = passports.map((passport) => {
  const extractedData = passport.split("-");

  return extractedData.reduce((finalObject, currItem) => {
    const [key, value] = currItem.split(":");

    finalObject[key] = value;
    return finalObject;
  }, {});
});

const requiredPassportFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
];

const answer = extractedPassportData.filter((passport) =>
  requiredPassportFields.every((field) => passport.hasOwnProperty(field))
).length;

console.log(`In your batch file, how many passports are valid => ${answer}`);
