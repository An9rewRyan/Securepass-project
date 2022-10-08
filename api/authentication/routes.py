from crypto.encode import encode
from fastapi import Body, HTTPException, status, APIRouter
from jose import JWTError, jwt
from models import User as ModelUser
from schema import User as SchemaUser 
from schema import Token
from .utils import *
from .env import *
from asyncpg.exceptions import UniqueViolationError

router = APIRouter()

@router.post("/user", response_model=SchemaUser)
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
    except JWTError:
        raise credentials_exception
    user = await get_user(username=username)
    if user is None:
        raise credentials_exception
    return user


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
