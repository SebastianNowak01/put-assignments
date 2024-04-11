import random
import math
from helpers import *


def testResults(bits):
    print("single bit test: ", singleBit(bits))
    print("long series test: ", longSeriesTest(bits))
    print(pokerTest(bits))

def main():
    primes = primesInRange(1000, 10000)
    checked_primes = list(filter(lambda x: x % 4 == 3, primes))
    N = random.choice(checked_primes) * random.choice(checked_primes)
    x = generateX(N)
    nums = []
    bits = []
    nums.append(x ** 2 % N)
    bits.append(nums[0] % 2)
    for _ in range(19999):
        nums.append(nums[-1] ** 2 % N)
        bits.append(nums[-1] % 2)
    testResults(bits)

main()
