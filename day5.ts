const part1TestInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`.trim();

/****
 * still I dont understand the logic here. after googling found this optimized solution.
 * Need to understand more.
 * https://github.com/Joxter/advent-of-code/blob/master/2023/js/day05.js
 * ***/

const day5ActualInput = await Bun.file("./inputs/day5.txt").text();

export function day5part1() {
  const [seedrow, ...paths] = day5ActualInput.split("\n\n");
  let seeds = seedrow.split(": ")[1].split(" ").map(Number);

  for (const path of paths) {
    const [name, ...ranges] = path.split("\n");
    const newSeeds = [...seeds];
    for (const range of ranges) {
      const [dest, src, len] = range.split(" ").map(Number);
      seeds.forEach((seed, index) => {
        if (seed >= src && seed < src + len) {
          newSeeds[index] = dest + (seed - src);
        }
      });
    }
    seeds = newSeeds;
  }
  console.log(Math.min(...seeds));
}

// Part 2 is tough for me to understand at the moment
// for now I will skip this.
