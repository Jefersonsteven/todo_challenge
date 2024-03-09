from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.app.api.routes.main import api_router
from .database import models

app = FastAPI(title="TodoChallenge API", version="0.1.0", description="API for the TodoChallenge")

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

# models.Base.metadata.create_all(models.engine) # This is not needed as we are using Alembic to manage the database migrations

