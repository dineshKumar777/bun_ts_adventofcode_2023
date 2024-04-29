const part1TestInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

const input = `
Card 184: 47 16 69 11 99 34 79 65 49  9 | 92 97 64 83 49 73 17 36 29 46  1 15 78 25 58 81 51 23 84 39 60 91 67  3 56
`;

const day4ActualInput = await Bun.file("./inputs/day4.txt").text();

export function day4part1() {
	const cards = day4ActualInput
		.replace(/\s\s/g, " ")
		.replace(/Card\s+\d+: /g, "")
		.trim()
		.split("\n");
	let totalPoints = 0;
	cards.forEach((card, cardIndex) => {
		console.log(`card ${cardIndex + 1} - ${card}`);
		let cardPoints = 0;
		let winnumCount = 0;
		const winningNums = card
			.trim()
			.split(" | ")[0]
			.split(" ")
			.map((x) => Number(x));

		const mynums = card
			.trim()
			.split(" | ")[1]
			.split(" ")
			.map((x) => Number(x));

		mynums.forEach((num, index) => {
			if (winningNums.includes(num)) {
				// console.log(`${index} winning num`, num);
				winnumCount++;
				if (winnumCount !== 1) {
					cardPoints *= 2;
				} else {
					cardPoints++;
				}
				console.log(`card ${cardIndex} ${num}: ${cardPoints}`);
			}
		});
		totalPoints += cardPoints;
	});
	console.log("part1 output:", totalPoints);
}

/***
 * solved the part1 challenge with testinput easily but faced challanges with actual input.
 * had issues with initial parsing because the of the whitespaces in actual input.
 *   const cards = day4ActualInput
    .replace(/\s\s/g, ' ')
    .replace(/Card\s+\d+: /g, '')
    .trim()
    .split('\n');
 * * */
