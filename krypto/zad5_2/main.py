import random
from helpers import split_secret, combine_shares


def main():
    # Code testing
    secret = random.randint(50000, 70000)
    num_shares = random.randint(7, 10)
    threshold = random.randint(3, 6)

    print("Secret:", secret)
    # Split secret
    shares, prime = split_secret(secret, num_shares, threshold)
    print("Shares:", shares)

    # Recreate secret
    reconstructed_secret = combine_shares(shares[:threshold], prime)
    print("Reconstructed Secret:", reconstructed_secret)


main()
