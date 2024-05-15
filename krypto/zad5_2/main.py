import random
from helpers import split_secret, combine_shares


def main():
    # Testowanie kodu
    secret = 42
    num_shares = 5
    threshold = 3

    # Podział sekretu
    shares, prime = split_secret(secret, num_shares, threshold)
    print("Shares:", shares)

    # Odtworzenie sekretu
    reconstructed_secret = combine_shares(shares[:threshold], prime)
    print("Reconstructed Secret:", reconstructed_secret)
    

main()
