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

/* byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
  If cm, the number must be at least 150 and at most 193.
  If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
 */

const requiredPassportFields = {
  byr: { rule: /^\d{4}$/, min: 1920, max: 2002 },
  iyr: { rule: /^\d{4}$/, min: 2010, max: 2020 },
  eyr: { rule: /^\d{4}$/, min: 2020, max: 2030 },
  hgt: {
    cm: { rule: /^\d{3}$/gm, min: 150, max: 193 },
    in: { rule: /^\d{2}$/gm, min: 59, max: 76 },
  },
  hcl: { rule: /^#[0-9a-f]{3,6}$/i },
  ecl: { rule: /^(amb|blu|brn|gry|grn|hzl|oth)$/i },
  pid: { rule: /^\d{9}$/ },
};

const requiredFields = Object.keys(requiredPassportFields);

const roundOne = extractedPassportData.filter((passport) =>
  requiredFields.every((field) => passport.hasOwnProperty(field))
);

const checkRules = (key, value) => {
  if (key === "cid") {
    return true;
  }
  if (key === "hgt") {
    const [num, unit] = value.split(/(cm|in)/i);
    if (unit) {
      const { min, max } = requiredPassportFields["hgt"][unit];
      return num >= min && num <= max;
    }
  } else {
    const { rule, min, max } = requiredPassportFields[key];
    const lowerUpperBoundary = min ? value >= min && value <= max : true;
    return rule.test(value) && lowerUpperBoundary;
  }
};

const answer = roundOne.reduce((validPassports, currPassport) => {
  const toCheck = Object.keys(currPassport);
  const valid = toCheck.every((key) => checkRules(key, currPassport[key]));

  if (valid) {
    validPassports.push(currPassport);
  }

  return validPassports;
}, []);

console.log(
  `In your batch file, how many passports are valid => ${answer.length}`
);
