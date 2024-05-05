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

const day5ActualInput = await Bun.file("./inputs/day5.txt").text();

const lines = part1TestInput.split("\n");

const convertSeed = (seed: number, maps: Map[]): number => {
	let current = seed;

	for (const map of maps) {
		const range = map[current];
		if (range) {
			current = range[0];
		} else {
			current = current;
		}
	}
	return current;
};

export function day5part1() {
	const seedNumbers = lines[0].split(": ")[1].split(" ").map(Number);

	const maps: Map<number, number[]>[] = [];
	let currentMap: Map = {};

	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];

		if (line.includes("map:")) {
			if (Object.keys(currentMap).length > 0) {
				maps.push(currentMap);
			}
			currentMap = {};
		} else {
			const [dest, src, length] = line.split(" ").map(Number);
			for (let j = 0; j < length; j++) {
				currentMap[src + j] = [dest + j];
				console.log(`${src}+${j} = ${dest}+${j}`);
			}
		}
	}

	maps.push(currentMap);
	console.log(maps);
	const locations = seedNumbers.map((seed) => convertSeed(seed, maps));
	console.log(locations);
	console.log("part1 output:", Math.min(...locations));
}
