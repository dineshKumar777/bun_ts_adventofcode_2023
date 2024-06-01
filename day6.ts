const part1TestInput = `
Time:      7  15   30
Distance:  9  40  200
`;

const day6ActualInput = await Bun.file("./inputs/day6.txt").text();

export function day6part1() {
  const [time, distance] = day6ActualInput
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1).map(Number));

  let output = 1;

  for (let i = 0; i < time.length; i++) {
    let possibleVictories = 0;
    for (let j = 0; j <= time[i]; j++) {
      let x = j * (time[i] - j);
      if (x > distance[i]) {
        possibleVictories++;
      }
    }
    output *= possibleVictories;
  }

  console.log("part1 output:", output);
}

export function day6part2() {
  const [time, distance] = day6ActualInput
    .trim()
    .split("\n")
    .map((line) => line.replaceAll(/\s+/g, "").split(":").slice(1).map(Number));

  let output = 1;

  for (let i = 0; i < time.length; i++) {
    let possibleVictories = 0;
    for (let j = 0; j <= time[i]; j++) {
      let x = j * (time[i] - j);
      if (x > distance[i]) {
        possibleVictories++;
      }
    }
    output *= possibleVictories;
  }

  console.log("part2 output:", output);
}
