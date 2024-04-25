const day1TestInput = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim();

const day1ActualInput = await Bun.file('./inputs/day1.txt').text();

const getValues = (input: string): number[] => {
  let nums: number[] = [];
  input.split('').forEach((char, index) => {
    const isNum = !isNaN(parseInt(char));
    if (isNum) {
      nums.push(parseInt(char));
    }
  });
  return nums;
};

const getCalibrationValue = (nums: number[]): number => {
  const calibrationValue = nums[0]
    .toString()
    .concat(nums[nums.length - 1].toString());
  return parseInt(calibrationValue);
};

let totalCalibrationValue = 0;

export function day1part1() {
  // part 1 output
  day1ActualInput.split('\n').forEach((line, index) => {
    const calibrationNums = getValues(line);
    const calibrationValue = getCalibrationValue(calibrationNums);
    totalCalibrationValue += calibrationValue;
  });
  console.log('part1 output:', totalCalibrationValue);
}

// ------------Part 2 -----------------

const day1Part2TestInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim();

const parseInput = (input: string): string => {
  input = input
    .replaceAll('one', 'o1ne')
    .replaceAll('two', 't2wo')
    .replaceAll('three', 't3hree')
    .replaceAll('four', 'f4our')
    .replaceAll('five', 'f5ive')
    .replaceAll('six', 's6ix')
    .replaceAll('seven', 's7even')
    .replaceAll('eight', 'e8ight')
    .replaceAll('nine', 'n9ine');
  return input;
};

export function day1part2() {
  totalCalibrationValue = 0;
  day1ActualInput.split('\n').forEach((line) => {
    const parsedInput = parseInput(line);
    const calibrationNums = getValues(parsedInput);
    const calibrationValue = getCalibrationValue(calibrationNums);
    totalCalibrationValue += calibrationValue;
  });

  console.log('part2 output:', totalCalibrationValue);
}

/***
 * difficulties faced
 * in part 2 faced difficulties in parsing input line due to merged words. Like eighttwo
 * if i use plain replace eigh2 which will omit eight. so cameup with a workaround of adding number in middle. like e8ight. Even adding at the beginning wont work.
 * initially i used replace() which replaces only one value. But if there is a duplicate digit its skipped which resulted in false values. using replaceAll() resolved this issue.
 * ex: twoeighttwo - with replace t2woe8ighttwo. use replaceall
 */
