import random
from sympy import randprime


def gen_polynomial(coefficients, secret, threshold, prime):
    """Generate a random polynomial."""
    coefficients.append(secret)
    for _ in range(1, threshold):
        coefficients.append(random.randint(1, prime - 1))


def calc_polynomial(coefficients, x, prime):
    """Calculate the value of the polynomial at x."""
    result = 0
    for coefficient in reversed(coefficients):
        result = (result * x + coefficient) % prime
    return result


def split_secret(secret, num_shares, threshold):
    """Generate shares based on polynomial evaluation."""
    prime = randprime(secret + num_shares + threshold, 2 * (secret + num_shares + threshold))
    coefficients = []
    gen_polynomial(coefficients, secret, threshold, prime)
    shares = []
    for x in range(1, num_shares + 1):
        share = (x, calc_polynomial(coefficients, x, prime))
        shares.append(share)
    return shares, prime


def combine_shares(shares, prime):
    """Recreating the secret using Lagrange interpolation."""
    recreated_secret = 0
    for j, (xj, yj) in enumerate(shares):
        numerator, denominator = 1, 1
        for i, (xi, _) in enumerate(shares):
            if i != j:
                numerator = (numerator * (-xi)) % prime
                denominator = (denominator * (xj - xi)) % prime
        lagrange_term = (yj * numerator * pow(denominator, -1, prime)) % prime
        recreated_secret = (recreated_secret + lagrange_term) % prime
    return recreated_secret
