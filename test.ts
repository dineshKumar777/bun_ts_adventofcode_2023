const input = `
Time:      7  15   30
Distance:  9  40  200
`;

function testfunction() {
  // const [time, distance] = input
  //   .trim()
  //   .split("\n")
  //   .map((line) => line.split(/\s+/).slice(1).map(Number));
  // console.log(time, distance);

  // let output = 1;

  // for (let i = 0; i < time.length; i++) {
  //   let possibleSolutions = 0;
  //   console.log(time[i], distance[i]);
  //   for (let j = 0; j <= time[i]; j++) {
  //     let x = j * (time[i] - j);
  //     console.log(x);
  //     if (x > distance[i]) {
  //       possibleSolutions++;
  //     }
  //   }
  //   output *= possibleSolutions;
  // }

  // console.log("part1 output ->", output);

  //part2 code

  const [time, distance] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1).map(Number));
  console.log(time, distance);
}

export default testfunction;
