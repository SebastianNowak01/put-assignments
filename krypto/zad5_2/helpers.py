import random
from sympy import randprime

def generate_polynomial(coefficients, secret, threshold, prime):
    ''' Generowanie losowego wielomianu stopnia threshold-1 '''
    coefficients.append(secret)
    for _ in range(1, threshold):
        coefficients.append(random.randint(1, prime - 1))

def evaluate_polynomial(coefficients, x, prime):
    ''' Obliczanie wartości wielomianu dla danej wartości x '''
    result = 0
    for coefficient in reversed(coefficients):
        result = (result * x + coefficient) % prime
    return result

def split_secret(secret, num_shares, threshold):
    ''' Generowanie udziałów na podstawie wielomianu '''
    prime = randprime(secret + num_shares + threshold, 2 * (secret + num_shares + threshold))
    coefficients = []
    generate_polynomial(coefficients, secret, threshold, prime)
    shares = []
    for x in range(1, num_shares + 1):
        share = (x, evaluate_polynomial(coefficients, x, prime))
        shares.append(share)
    return shares, prime

def combine_shares(shares, prime):
    ''' Odtwarzanie sekretu na podstawie udziałów '''
    result = 0
    for j, (xj, yj) in enumerate(shares):
        numerator, denominator = 1, 1
        for i, (xi, _) in enumerate(shares):
            if i != j:
                numerator = (numerator * (-xi)) % prime
                denominator = (denominator * (xj - xi)) % prime
        lagrange_term = (yj * numerator * pow(denominator, -1, prime)) % prime
        result = (result + lagrange_term) % prime
    return result

