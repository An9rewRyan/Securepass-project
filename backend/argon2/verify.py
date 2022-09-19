from init import argon2Hasher

def verify(password):
    verifyValid = argon2Hasher.verify(hash, password)
    return verifyValid
