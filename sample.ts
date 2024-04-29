// import visualization libraries {
const {
  Array1DTracer,
  Array2DTracer,
  Layout,
  LogTracer,
  Tracer,
  VerticalLayout,
} = require('algorithm-visualizer');
// }

// define tracer variables {
const array2dTracer = new Array2DTracer('Input');
const parsedarray2dTracer = new Array2DTracer('Parsed Input');
const finalInputArray2dTracer = new Array2DTracer('Parsed Input');
const array1dTracer = new Array1DTracer('First and last digit in each row');
const logTracer = new LogTracer('Console');
// }

const messages1 = `
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
    `
  .trim()
  .split('\n');

const messages = `
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
    `
  .trim()
  .split('\n');

const parsedMessages = `
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
    `
  .trim()
  .split('\n');

let parsedMessages1 = [];
let finalInput = [];

let calibrationValues = [];
let totalCalibrationValue = 0;

const getCalibrationValues = (input, rowIndex) => {
  let nums = [];
  input.split('').forEach((char, colIndex) => {
    const isNum = !isNaN(Number(char));
    if (isNum) {
      nums.push(Number(char));
      //visualize {
      finalInputArray2dTracer.select(rowIndex, colIndex);
      Tracer.delay();
      //}
    }

    if (colIndex === input.length - 1) {
      const calibrationValue = Number(
        nums[0].toString().concat(nums[nums.length - 1].toString())
      );
      totalCalibrationValue += calibrationValue;
      // visualize {
      logTracer.println(`calibration value ${calibrationValue}`);
      logTracer.println(`totalCalibration value ${totalCalibrationValue}`);
      calibrationValues.push(calibrationValue);
      array1dTracer.set(calibrationValues);
      Tracer.delay();
      // }
    }
  });
  return totalCalibrationValue;
};

const digitsInWords = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const parsedDigitsInWords = [
  'o1ne',
  't2wo',
  't3hree',
  'f4our',
  'f5ive',
  's6ix',
  's7even',
  'e8ight',
  'n9ine',
];

const highlightDigitsinWords = (line, rowIndex, wordsInput, tracerObj) => {
  logTracer.println(`line ${line}`);
  for (const word of wordsInput) {
    logTracer.println(word);
    if (line.includes(word)) {
      //visualize {
      const startIndex = line.indexOf(word);
      const endIndex = startIndex + word.length - 1;
      tracerObj.selectRow(rowIndex, startIndex, endIndex);
      Tracer.delay();
      //}
    }
  }
};

const parseInput = (input) => {
  input = input
    .replace(/one/g, 'o1ne')
    .replace(/two/g, 't2wo')
    .replace(/three/g, 't3hree')
    .replace(/four/g, 'f4our')
    .replace(/five/g, 'f5ive')
    .replace(/six/g, 's6ix')
    .replace(/seven/g, 's7even')
    .replace(/eight/g, 'e8ight')
    .replace(/nine/g, 'n9ine');
  return input;
};

function part2() {
  let total = 0;
  messages.forEach((line, rowIndex) => {
    // visualize {
    array2dTracer.selectRow(rowIndex, 0, line.length - 1);
    Tracer.delay();
    array2dTracer.deselectRow(rowIndex, 0, line.length - 1);
    // }
    highlightDigitsinWords(line, rowIndex, digitsInWords, array2dTracer);
    parsedMessages1.push(parseInput(line));
  });
  parsedarray2dTracer.set(parsedMessages1);
  parsedMessages1.forEach((line, rowIndex) => {
    // visualize {
    parsedarray2dTracer.selectRow(rowIndex, 0, line.length - 1);
    Tracer.delay();
    parsedarray2dTracer.deselectRow(rowIndex, 0, line.length - 1);
    Tracer.delay();
    highlightDigitsinWords(
      line,
      rowIndex,
      parsedDigitsInWords,
      parsedarray2dTracer
    );
    // }
  });
  finalInput = parsedMessages1;
  finalInputArray2dTracer.set(finalInput);
  finalInput.forEach((line, index) => {
    // visualize {
    finalInputArray2dTracer.selectRow(index, 0, line.length - 1);
    Tracer.delay();
    finalInputArray2dTracer.deselectRow(index, 0, line.length - 1);
    // }
    total = getCalibrationValues(line, index);
  });

  logTracer.println(total);
}

(function main() {
  // visualize {
  Layout.setRoot(
    new VerticalLayout([
      array2dTracer,
      parsedarray2dTracer,
      finalInputArray2dTracer,
      array1dTracer,
      logTracer,
    ])
  );
  array2dTracer.set(messages);
  Tracer.delay();
  // }
  part2();
})();
