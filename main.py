from datetime import datetime, timedelta
from locale import YESEXPR
from operator import ge

from fastapi import Body, Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from models import User as ModelUser
from schema import User as SchemaUser 
from schema import TokenData, Token
from crypto.verify import verify
from crypto.encode import encode
import os, sys
from db import db
from dotenv import load_dotenv
sys.path.append('./argon2')
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

app = FastAPI(title="Async FastAPI")


@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()


async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify(user.password, password) :
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_user(username: str) -> SchemaUser:
    user = await ModelUser.get(username)
    return SchemaUser(**user)

@app.post("/user", response_model=SchemaUser)
async def get_current_user(token: str = Body()):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def generate_token(username: str) -> Token:
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/token", response_model=Token)
async def login_for_access_token(user: SchemaUser):
    user = await authenticate_user(user.username, user.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return generate_token(user.username)

@app.post("/signup", response_model=Token)
async def signup(user: SchemaUser):
    hashed_password = encode(user.password)
    user.password = hashed_password
    user_id = await ModelUser.create(user=user.dict())
    if user_id:
        return generate_token(user.username)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"WWW-Authenticate": "Bearer"},
        ) 
