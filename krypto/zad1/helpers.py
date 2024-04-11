import math
import random

def primesInRange(lower, upper):
    """generate prime numbers in a given range."""
    primes = []
    for num in range(lower, upper):
        if num > 1:
            for i in range(2, num):
                if (num % i) == 0:
                    break
            else:
                primes.append(num)
    return primes


def generateX(N):
    """generate a random number x."""
    x = 0
    while True:
        x = random.randint(1000, 9999)
        if math.gcd(N, x) == 1:
            return x


######## TESTS ########

def singleBit(bits):
    """single bit test."""
    if bits.count(1) < 9725 or bits.count(1) > 10275:
        return False
    return True


def seriesTest(bits):
    """series test."""
    correct_series = {1: [2315,2685],
                      2: [1114,1386],
                      3: [527,723],
                      4: [240,384],
                      5: [103,209],
                      6: [103,209]}
    current_series = []

#check if there is a series of 1s or 0s longer than 26
def longSeriesTest(bits):
    """long series test."""
    current_series = 1
    for i in range(1, len(bits)):
        if bits[i] == bits[i - 1]:
            current_series += 1
        else:
            if current_series > 26:
                return False
            current_series = 1
    return True


# count all possibilites of 4-bit sequences
def pokerTest(bits):
    """poker test."""
    poker = {}
    for i in range(0, len(bits) - 4):
        seq = ''.join(map(str, bits[i:i + 4]))
        if seq in poker:
            poker[seq] += 1
        else:
            poker[seq] = 1
    return poker
