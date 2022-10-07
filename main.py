from fastapi import FastAPI
import sys
from db import db
sys.path.append("./api/authentication")
sys.path.append("./crypto")
from api.authentication.routes import router as auth_router

app = FastAPI()

app = FastAPI(title="Async FastAPI")

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

app.include_router(auth_router)
