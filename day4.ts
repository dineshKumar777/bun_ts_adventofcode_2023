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

function countCardPoints(line: string) {
	const lists = line.split(":")[1].trim().split("|");
	const [winningNumbers, myNumbers] = lists.map(
		(item) => item.match(/\d+/g)?.map(Number) || [],
	);

	const commonItems = myNumbers.filter((item) => winningNumbers.includes(item));
	let output = 0;
	if (commonItems.length > 0) {
		output += 2 ** (commonItems.length - 1);
	}
	return output;
}

const lines = day4ActualInput.trim().split("\n");

export function day4part1() {
	let result = 0;
	for (const line of lines) {
		result += countCardPoints(line);
	}
	console.log("part1 output:", result);
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

let cardInstances: number[] = [];
function countCardInstances(line: string, cardNumber: number) {
	const lists = line.split(":")[1].trim().split("|");
	lists;
	const [winningNumbers, myNumbers] = lists.map(
		(item) => item.match(/\d+/g)?.map(Number) || [],
	);
	const commonItems = myNumbers.filter((item) => winningNumbers.includes(item));
	cardInstances[cardNumber] = (cardInstances[cardNumber] ?? 0) + 1;

	for (let j = 0; j < cardInstances[cardNumber]; j++) {
		if (commonItems.length === 0) {
			continue;
		}
		for (let i = 1; i <= commonItems.length; i++) {
			cardInstances[cardNumber + i] = (cardInstances[cardNumber + i] ?? 0) + 1;
		}
	}

	return cardInstances[cardNumber];
}

export function day4part2() {
	let count = 0;
	lines.forEach((line, index) => {
		count += countCardInstances(line, index);
	});
	console.log("part2 output:", count);
}

// still i dont understand part2 logic. I got the solution from online and added here for completion sake. But need to understand it better.
