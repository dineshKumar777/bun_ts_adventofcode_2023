// Example usage
const input = `
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

const [seedrow, ...paths] = input.split("\n\n");
let seeds = seedrow.split(": ")[1].split(" ").map(Number);
seeds;
paths;

for (const path of paths) {
	const [name, ...ranges] = path.split("\n");
	name;
	ranges;
	const newSeeds = [...seeds];
	newSeeds;
	for (const range of ranges) {
		range;
		const [dest, src, len] = range.split(" ").map(Number);

		seeds.forEach((seed, index) => {
			console.log(`${seed} >= ${src} = ${dest} < (${seed} - ${src})`);
			if (seed >= src && seed < src + len) {
				newSeeds[index] = dest + (seed - src);
				console.log(`${newSeeds[index]} = ${dest} + ${seed} - ${src}`);
			}
		});
	}
	seeds = newSeeds;
}

console.log(Math.min(...seeds));
