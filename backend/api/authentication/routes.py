from turtle import pen
from crypto.encode import encode
from fastapi import Body, HTTPException, status, APIRouter
from jose import JWTError, jwt
from models import User as ModelUser
from schema import User as SchemaUser 
from schema import Token, TokenStatus
from .utils import *
from .env import *
from asyncpg.exceptions import UniqueViolationError
from datetime import datetime

router = APIRouter()

@router.post("/check", response_model=TokenStatus)
async def is_token_valid(token: Token):
    token_status =  await check_token(token.access_token)
    return token_status

@router.post("/token", response_model=Token)
async def login_for_access_token(user: SchemaUser):
    user = await authenticate_user(user.username, user.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return generate_token(user.username)

@router.post("/signup", response_model=Token)
async def signup(user: SchemaUser):
    hashed_password = encode(user.password)
    user.password = hashed_password
    try:
        user_id = await ModelUser.create(user=user.dict())
    except UniqueViolationError:
        raise HTTPException(
            status_code=500,
            detail="Username of email is not uniq",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user_id:
        return generate_token(user.username)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"WWW-Authenticate": "Bearer"}
        ) 

@router.post("/signin", response_model=Token)
async def signin(user: SchemaUser):
    user_ok = await authenticate_user(user.username, user.password)
    if not user_ok:
        raise HTTPException(
            status_code=401,
            detail="Username or creedentials are invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return generate_token(user.username)