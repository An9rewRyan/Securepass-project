from datetime import datetime, timedelta
from jose import jwt
from schema import TokenStatus
from models import User as ModelUser
from schema import User as SchemaUser 
from schema import Token
from crypto.verify import verify
import os
from fastapi.security import OAuth2PasswordBearer
from .env import *
import zoneinfo
zone = zoneinfo.ZoneInfo("Europe/Moscow")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        print("USer dont exist")
        return False
    if not verify(user.password, password) :
        print("PAss dont match")
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(zone) + expires_delta
        print(expire.strftime("%Y-%m-%d %H:%M:%S"))
    else:
        expire = datetime.now(zone) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def generate_token(username: str) -> Token:
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
        }

async def get_user(username: str) -> SchemaUser:
    user = await ModelUser.get(username)
    return SchemaUser(**user)

async def check_token(token: str) -> TokenStatus:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return {
                "status":"failed", 
                "explain":"username is none"}
    except jwt.ExpiredSignatureError:
        return {
            "status":"failed", 
            "explain":"token expired"}
    user = await get_user(username=username)
    if user is None:
        return {
            "status":"failed", 
            "explain":"user not exist"}
    return {
        "status":"success", 
        "explain":"token is fine"}