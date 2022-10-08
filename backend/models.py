from email.policy import default
from enum import unique
import sqlalchemy
from db import db, metadata, sqlalchemy
from schema import User


users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String, unique=True),
    sqlalchemy.Column("password", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String, unique = True)
)


class User:
    @classmethod
    async def get(cls, username):
        query = users.select().where(users.c.username == username)
        user = await db.fetch_one(query)
        return user

    @classmethod
    async def create(cls, user: dict) -> int:
        query = users.insert().values(user)
        user_id = await db.execute(query)
        return user_id