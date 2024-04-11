import random
from helpers import generateX, singleBit, seriesTest, longSeriesTest, pokerTest, primesInRange


def testResults(bits):
    print("single bit test: ", singleBit(bits))
    print("series test 0: ", seriesTest(bits, 0))
    print("series test 1: ", seriesTest(bits, 1))
    print("long series test: ", longSeriesTest(bits))
    print("poker test: ", pokerTest(bits))


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
