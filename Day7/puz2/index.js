const { rawInput } = require("../../helperscripts/loadInput");
let loadedInput = rawInput("./input.txt");

let splitted = loadedInput.split("\n");
const lookFor = ["shiny gold"];
const tree = {};

const extractor = (acc, rule) => {
  const [no, teint, color, _] = rule.trim().split(" ");
  let amount = no === "no" ? 0 : Number(no);
  acc[`${teint} ${color}`] = amount;
  return acc;
};

while (lookFor.length) {
  const search = lookFor.shift();
  splitted.forEach((line, i) => {
    const [teint, color, , , ...bags] = line.split(" ");
    if (`${teint} ${color}` === search) {
      const bagsArray = { ...bags.join(" ").split(",").reduce(extractor, {}) };
      splitted = splitted.filter((keep) => keep !== line);
      lookFor.push(...Object.keys(bagsArray));
      tree[`${teint} ${color}`] = bagsArray;
    }
  });
}

const getBagCount = (bags, type) => {
  let total = 0;

  const contents = bags[type];

  if (contents) {
    Object.entries(contents).forEach(([type, count]) => {
      total += count;
      total += getBagCount(bags, type) * count;
    });
  }

  return total;
};

console.log(
  `How many bag colors can eventually contain at least one shiny gold bag =>${getBagCount(
    tree,
    "shiny gold"
  )}`
);
