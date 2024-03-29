function gcd(x: number, y: number): number {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function getX0(N: number): number {
  let x0;
  while (true) {
    let random = getRandomInt(1000, 10000);
    if (gcd(N, random) === 1) {
      x0 = random;
      break;
    }
  }
  return x0;
}

function singleBits(bitArray: number[]): boolean {
  let counter = 0;
  bitArray.forEach((e) => {
    if (e === 1) counter++;
  });
  if (counter < 9725 || counter > 10275) return false;
  return true;
}

function seriesTest(bitArray: number[], bit: number): number[] {
  const series = new Array(6).fill(0);
  let count = 0;
  bitArray.forEach((e) => {
    if (e === bit) count++;
    else {
      if (count > 0) {
        series[Math.min(count - 1, 5)] += 1;
        count = 0;
      }
    }
  });
  if (count > 0) {
    series[Math.min(count - 1, 5)] += 1;
  }

  return series;
}

function seriesTestWrapper(bitArray: number[], bit: number): void {
  const series = seriesTest(bitArray, bit);
  const boolArray: boolean[] = [];
  if (series[0] > 2316 && series[0] < 2685) {
    boolArray.push(true);
  } else boolArray.push(false);
  if (series[1] > 1114 && series[2] < 1386) {
    boolArray.push(true);
  } else boolArray.push(false);
  if (series[2] > 527 && series[2] < 723) {
    boolArray.push(true);
  } else boolArray.push(false);
  if (series[3] > 240 && series[3] < 384) {
    boolArray.push(true);
  } else boolArray.push(false);
  if (series[4] > 103 && series[4] < 209) {
    boolArray.push(true);
  } else boolArray.push(false);
  if (series[5] > 103 && series[5] < 208) {
    boolArray.push(true);
  } else boolArray.push(false);
  console.log(bit + "s series:         " + series);
  console.log(bit + "s series results: " + boolArray);
}

// do poprawy?
function longSeriesTest(bitArray: number[], bit: number): void {
  let count = 0;

  for (const myBit of bitArray) {
    if (myBit === bit) {
      count++;
    } else {
      count = 0;
      if (count >= 26) {
        console.log("long series test for " + bit + "s: " + count + " false");
        return;
      }
    }
  }
  if (count >= 26) {
    console.log("long series test for " + bit + "s: " + count + " false");
    return;
  }
  console.log("long series test for " + bit + "s: " + count + " true");
}

function pokerTest(bitArray: number[]): void {
  const numberCounter = new Array(16).fill(0);
  let j = 0;
  let numberArray: number[] = [];
  for (let i = 0; i < 20_000; i++) {
    numberArray.push(bitArray[i]);
    j++;
    if (j === 4) {
      let parsedNumber = parseInt(numberArray.join(""), 2);
      numberCounter[parsedNumber] += 1;
      j = 0;
      numberArray.length = 0;
    }
  }
  const sum = numberCounter.reduce((acc, curr) => acc + curr * curr);

  const x = (16 / 5000) * sum - 5000;
  console.log("poker test: " + x);
  if (x > 2.16 && x < 46.17) console.log("poker test: true");
  else console.log("poker test: false");
}

export function printTestResults(bitArray: number[]) {
  console.log("single bits test: " + singleBits(bitArray));
  seriesTestWrapper(bitArray, 1);
  seriesTestWrapper(bitArray, 0);
  longSeriesTest(bitArray, 1);
  longSeriesTest(bitArray, 0);
  pokerTest(bitArray);
}
