from pydantic import BaseModel

class User(BaseModel):
    password: str
    username: str
    email: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenStatus(BaseModel):
    status: str
    explain: str

class TokenData(BaseModel):
    username: str | None = None

class UserInDB(User):
    hashed_password: str