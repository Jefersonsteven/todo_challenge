from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import todo, user

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

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

