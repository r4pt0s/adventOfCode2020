const { rawInput } = require("../../helperscripts/loadInput");
let loadedInput = rawInput("./input.txt");
/* let loadedInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`; */

//light red bags contain 1 bright white bag, 2 muted yellow bags.
// teint color BAGS CONTAIN number teint color BAG, number teint color BAGS.

const splitted = loadedInput.split("\n");
const lookFor = ["shiny-gold"];
const alreadyFound = [""];
let counter = 0;
const extractor = (rule) => {
  const [no, teint, color, _] = rule.trim().split(" ");

  return `${teint}-${color}`;
};

while (lookFor.length) {
  const search = lookFor.pop();
  splitted.forEach((line) => {
    const [teint, color, , , ...bags] = line.split(" ");
    const bagsArray = bags.join(" ").split(",").map(extractor);

    if (
      bagsArray.includes(search) &&
      !alreadyFound.includes(`${teint}-${color}`)
    ) {
      lookFor.push(`${teint}-${color}`);
      alreadyFound.push(`${teint}-${color}`);
      counter++;
    }
  });
  console.log(alreadyFound);
}

console.log(
  `How many bag colors can eventually contain at least one shiny gold bag =>${counter}`
);
