"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
function main(p, q) {
    if (p % 4 !== 3 || q % 4 !== 3 || !(0, helper_1.isPrime)(p) || !(0, helper_1.isPrime)(q)) {
        console.log(`Input is incorrect. p mod 4 is: ${p % 4}, q mod 4 is: ${q % 4}, or numbers are not prime.`);
        return;
    }
    const N = p * q;
    let x0 = (0, helper_1.getX0)(N);
    // console.log("x0: " + x0);
    let x1 = (x0 * x0) % N;
    const randomNumbers = [];
    randomNumbers.push(x1);
    const bitArray = [];
    x1 = x1 % 2;
    bitArray.push(x1);
    for (let i = 0; i < 19999; i++) {
        let prevX = randomNumbers[i];
        let currX = (prevX * prevX) % N;
        randomNumbers.push(currX);
        currX = currX % 2;
        bitArray.push(currX);
    }
    (0, helper_1.printTestResults)(bitArray);
}
main(1327, 1499);
