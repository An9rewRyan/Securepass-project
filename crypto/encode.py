from .engine import argon2Hasher

def encode(password):
    hash = argon2Hasher.hash(password)
    return hash