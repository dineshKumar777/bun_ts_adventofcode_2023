const input = `
Time:      7  15   30
Distance:  9  40  200
`;

const output = input.split("\n").map((line) => line.split(":"));

console.log(output);
