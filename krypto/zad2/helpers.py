import math
import random
import string

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


def generateE(N):
    primes = primesInRange(1000, 10000)
    while True:
        e = random.choice(primes)
        if math.gcd(N, e) == 1:
            return e


def generateMessage(len):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(len))


def encrypt(message, e, n):
    cipher = [pow(ord(char), e, n) for char in message]
    return cipher


def decrypt(cipher, d, n):
    message = [chr(pow(char, d, n)) for char in cipher]
    return ''.join(message)


### Diffie-Hellman ###

def factor(n):
    factors = []
    i = 2
    while i * i <= n:
        if n % i:
            i += 1
        else:
            n //= i
            factors.append(i)
    if n > 1:
        factors.append(n)
    return set(factors)


def is_primitive_root(g, p):
    if pow(g, p - 1, p) != 1:
        return False

    factors = factor(p - 1)
    for i in factors:
        if pow(g, (p - 1) // i, p) == 1:
            return False
    return True


def primitiveRoots(p):
    primitive_roots = []
    for g in range(1, p):
        if is_primitive_root(g, p):
            primitive_roots.append(g)
    return primitive_roots
