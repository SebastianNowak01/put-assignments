import { isPrime, getX0, printTestResults } from "./helper";

function main(p: number, q: number) {
  if (p % 4 !== 3 || q % 4 !== 3 || !isPrime(p) || !isPrime(q)) {
    console.log(
      `Input is incorrect. p mod 4 is: ${p % 4}, q mod 4 is: ${
        q % 4
      }, or numbers are not prime.`,
    );
    return;
  }
  const N = p * q;
  let x0 = getX0(N);
  console.log("x0: " + x0);
  let x1 = (x0 * x0) % N;
  const randomNumbers: number[] = [];
  randomNumbers.push(x1);
  const bitArray: number[] = [];
  x1 = x1 % 2;
  bitArray.push(x1);
  for (let i = 0; i < 19_999; i++) {
    let prevX = randomNumbers[i];
    let currX = (prevX * prevX) % N;
    randomNumbers.push(currX);
    currX = currX % 2;
    bitArray.push(currX);
  }
  printTestResults(bitArray);
}

main(1327, 1499);
