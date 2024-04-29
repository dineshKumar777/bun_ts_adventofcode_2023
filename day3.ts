const part1TestInput: string = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.trim();

const day3ActualInput = await Bun.file('./inputs/day3.txt').text();

export function day3part1() {
  const lines = day3ActualInput.split('\n');
  const lineWidth = lines[0].length;

  let partNumberSum = 0;

  for (let i = 0; i < lines.length; i++) {
    // console.log(lines[i]);
    const matches = [...lines[i].matchAll(/[0-9]+/g)]; //why this requires dot spread. Understand more on this.
    // console.table(matches);
    for (const match of matches) {
      const number = Number(match[0]);
      // console.log(number);
      const minX = Math.max(0, match.index - 1);
      const maxX = Math.min(lineWidth, match.index + match[0].length + 1);
      const lineAbove = lines[Math.max(0, i - 1)].slice(minX, maxX);
      // console.log('lineabove', lineAbove);
      const sameLine = lines[i].slice(minX, maxX);
      // console.log('sameline', sameLine);
      const lineBelow = lines[Math.min(i + 1, lines.length - 1)].slice(
        minX,
        maxX
      );
      // console.log('linebelow', lineBelow);
      const adjacentCharacters = lineAbove + sameLine + lineBelow;
      console.log(`number: ${number} ${adjacentCharacters}`);
      if (!adjacentCharacters.replaceAll(/[0-9\.]/g, '').length) {
        // console.log('non part number');
        continue;
      }
      partNumberSum += number;
    }
  }
  console.log('part1 output:', partNumberSum);
}

/***
 * this is was a problem i was not able to solve without refrencing other solution. This is just a plain copy of github solution i found. for this problem i need to understand 2d array concept.
 * Looks like part2 solutions which i found doesnt requires 2d array concept.
 **/

export function day3part2() {
  let raw = part1TestInput.replace(/\r?\n/g, ';');
  // console.log('rawinput ->', raw);

  const wlen = raw.indexOf(';') + 1;
  const partNums = raw.match(/\d+/g)!.map((x) => +x);
  let allstar: { [key: number]: number[] } = {};
  for (let num of partNums) {
    let startIndex = raw.indexOf(num.toString());
    let endIndex = startIndex + num.toString().length;

    for (let i = startIndex - 1 - wlen; i < endIndex + 1 - wlen; i++)
      if (raw[i] === '*')
        allstar[i] ? allstar[i].push(num) : (allstar[i] = [num]);
    for (let i = startIndex - 1; i < endIndex + 1; i++)
      if (raw[i] === '*')
        allstar[i] ? allstar[i].push(num) : (allstar[i] = [num]);
    for (let i = startIndex - 1 + wlen; i < endIndex + 1 + wlen; i++)
      if (raw[i] === '*')
        allstar[i] ? allstar[i].push(num) : (allstar[i] = [num]);

    raw =
      raw.substring(0, startIndex) +
      '.'.repeat(num.toString().length) +
      raw.substring(endIndex);
    // console.log('raw', raw);
  }
  // find the keys which have exact two elements and sum up their multiplication (of exact two elements)
  console.log(allstar);
  const output = Object.values(allstar)
    .filter((x) => x.length === 2)
    .map((x) => x[0] * x[1])
    .reduce((a, b) => a + b);
  console.log('part2 output:', output);
}
