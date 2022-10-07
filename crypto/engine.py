import argon2
import os
from dotenv import load_dotenv

load_dotenv() 

argon2Hasher = argon2.PasswordHasher(
    time_cost=int(os.getenv('TIME_COST')), 
    memory_cost=int(os.getenv('MEMORY_COST')), 
    parallelism=int(os.getenv('PARALLELISM')),
    hash_len=int(os.getenv('HASH_LEN')),
    salt_len=int(os.getenv('SALT_LEN')),
    type = argon2.low_level.Type(int((os.getenv('TYPE'))))
)