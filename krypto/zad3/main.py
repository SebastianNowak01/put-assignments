import hashlib
import time
import random


def generate_hashes(input_text):
    hash_algorithms = {
        "MD5     ": hashlib.md5,
        "SHA-1   ": hashlib.sha1,
        "SHA-256 ": hashlib.sha256,
        "SHA3-512": hashlib.sha3_512,
    }

    hashes = {}
    for algorithm_name, algorithm in hash_algorithms.items():
        start_time = time.time()
        hash_obj = algorithm()
        hash_obj.update(input_text.encode('utf-8'))
        hashed_value = hash_obj.hexdigest()
        execution_time = time.time() - start_time
        hashes[algorithm_name] = {"hash": hashed_value, "time": execution_time}
    return hashes

input_data = [
    "To jest testowy tekst i jest dlugi",
    "Nazywam sie Jan",
    "Ala ma psa",
    "String",
    "h",
]

for data in input_data:
    print(f"Text: {data}")
    hashes = generate_hashes(data)
    for algorithm_name, info in hashes.items():
        print(f"{algorithm_name}: {info['time']:.6f}s, {info['hash']}")
    print()

word = "teemo"
md5_hash = generate_hashes(word)["MD5     "]["hash"]
print(f"MD5 hash of '{word}' is {md5_hash}")

def check_collisions():
    to_check = 12
    tests = 1_000
    collision_count = 0

    base_hash = hashlib.sha256(rand_str(30).encode()).hexdigest()
    base_hash_bits = str_to_bits(base_hash)

    for i in range(tests):
        s = rand_str(30)
        s_hash = hashlib.sha256(s.encode()).hexdigest()
        s_hash_bits = str_to_bits(s_hash)
        if s_hash_bits[:to_check] == base_hash_bits[:to_check]:
            collision_count += 1

    print("Probabilty of collision in first 12 bits:", collision_count / tests)

def rand_str(length):
    return ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=length))

def str_to_bits(s):
    return ''.join(format(ord(c), '08b') for c in s)

check_collisions()

# SAC
def check_sac(hash_algorithm):
    text1 = generate_hashes("kot wredny")["SHA-256 "]["hash"]
    text2 = generate_hashes("kut wredny")["SHA-256 "]["hash"]

    hashed_text1 = bin(int(text1, 16)).removeprefix("0b").zfill(256)
    hashed_text2 = bin(int(text2, 16)).removeprefix("0b").zfill(256)

    count = 0
    for x in range(256):
        if hashed_text1[x] == hashed_text2[x]:
            count += 1

    return round(count / len(hashed_text1), 4)


sac_score = check_sac("SHA-256")
print(f"Tested SAC score: {sac_score}")
