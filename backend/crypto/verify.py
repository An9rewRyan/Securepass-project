from .engine import argon2Hasher
from argon2.exceptions import VerifyMismatchError

def verify(hashed_pass, raw_pass):
    try:
        verifyValid = argon2Hasher.verify(hashed_pass, raw_pass)
        return verifyValid
    except VerifyMismatchError:
        return False