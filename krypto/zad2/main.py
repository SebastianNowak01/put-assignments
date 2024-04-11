import random
from helpers import primesInRange, generateE, generateMessage, encrypt, decrypt, primitiveRoots


def main():
    primes = primesInRange(1000, 10000)
    p = random.choice(primes)
    q = random.choice(primes)
    n = p * q
    phi = (p - 1) * (q - 1)
    e = generateE(phi)
    d = pow(e, -1, phi)
    message = generateMessage(50)
    print("Message:   ", message)
    cipher = encrypt(message, e, n)
    decrypted = decrypt(cipher, d, n)
    print("Decrypted: ", decrypted)
    print(message == decrypted)

    # Diffie-Hellman 
    n = random.choice(primes)
    # g is primitive root modulo n
    g = random.choice(primitiveRoots(n))
    print(g, n)
    x = random.randint(1000, 9999)
    y = random.randint(1000, 9999)
    X = pow(g, x, n)
    Y = pow(g, y, n)
    kA = pow(Y, x, n)
    kB = pow(X, y, n)
    print(kA, kB)


main()
