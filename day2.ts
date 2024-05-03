const part1TestInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.trim();

const day2ActualInput = await Bun.file("./inputs/day2.txt").text();

const getSubsets = (input: string): string[] => {
	return input
		.split(": ")[1]
		.split("; ")
		.flatMap((set) => set.split(", "));
};

const isValidGame = (subsets: string[]): boolean => {
	let flag = true;
	for (const cube of subsets) {
		const cubeCount = Number(cube.split(" ")[0]);
		if (cube.includes("blue") && cubeCount > 14) {
			flag = false;
		} else if (cube.includes("red") && cubeCount > 12) {
			flag = false;
		} else if (cube.includes("green") && cubeCount > 13) {
			flag = false;
		}
	}

	return flag;
};

const getPowerofCubes = (subsets: string[]) => {
	let red = 0;
	let green = 0;
	let blue = 0;
	for (const cube of subsets) {
		const cubeCount = Number(cube.split(" ")[0]);
		if (cube.includes("red") && cubeCount > red) {
			red = cubeCount;
		} else if (cube.includes("green") && cubeCount > green) {
			green = cubeCount;
		} else if (cube.includes("blue") && cubeCount > blue) {
			blue = cubeCount;
		}
	}
	return red * green * blue;
};

export function day2part1() {
	let output = 0;
	day2ActualInput.split("\n").forEach((game, index) => {
		const subsets = getSubsets(game);
		if (isValidGame(subsets)) {
			output += index + 1;
		}
	});
	console.log("part1 output:", output);
}

export function day2part2() {
	let output = 0;
	day2ActualInput.split("\n").forEach((game, index) => {
		const subsets = getSubsets(game);
		const powerOfCubes = getPowerofCubes(subsets);
		output += powerOfCubes;
	});
	console.log("part2 output:", output);
}

// Only difficulty I faced is understood the requirement and worked solution for the wrong requirement. next time need to re-read the requirement again.
