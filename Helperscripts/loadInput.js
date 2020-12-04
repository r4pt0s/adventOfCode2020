const fs = require("fs");
//const input = fs.readFileSync("input.txt", "utf8").split("\n");

module.exports = {
  input: (inputfile) => fs.readFileSync(inputfile, "utf8").split("\r\n"),
  rawInput: (inputfile) => fs.readFileSync(inputfile, "utf8"),
};
