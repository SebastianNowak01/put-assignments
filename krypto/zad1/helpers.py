import math
import random


def primesInRange(lower, upper):
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
    x = 0
    while True:
        x = random.randint(1000, 9999)
        if math.gcd(N, x) == 1:
            return x


######## TESTS ########

def singleBit(bits):
     if 9725 < bits.count(1) > 10275:
        return False
     return True


def seriesTest(bits, bit):
    correct_series = {1: [2315, 2685],
                      2: [1114, 1386],
                      3: [527, 723],
                      4: [240, 384],
                      5: [103, 209],
                      6: [103, 209]}
    current_series = [0 for i in range(6)]
    current_length = 0
    for i in bits:
        if i == bit:
            current_length += 1
        else:
            if current_length > 0:
                current_series[min(current_length - 1, 5)] += 1
                current_length = 0
    if current_length > 0:
        current_series[min(current_length - 1, 5)] += 1

    for i in range(6):
        if not correct_series[i + 1][0] < current_series[i] < correct_series[i + 1][1]:
            return False
    return True


def longSeriesTest(bits):
    current_series = 1
    for i in range(1, len(bits)):
        if bits[i] == bits[i - 1]:
            current_series += 1
        else:
            if current_series > 26:
                return False
            current_series = 1
    return True


def pokerTest(bits):
    poker = {}
    for i in range(0, len(bits), 4):
        seq = ''.join(map(str, bits[i:i + 4]))
        if seq in poker:
            poker[seq] += 1
        else:
            poker[seq] = 1

    pokerSum = 16 / 5000 * sum([v ** 2 for v in poker.values()]) - 5000
    if 2.16 < pokerSum < 46.17:
        return True
    return False
