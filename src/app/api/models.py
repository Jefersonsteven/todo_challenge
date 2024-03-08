from pydantic import BaseModel
from fastapi import Query
from typing import Annotated
import uuid

class UserLogin(BaseModel):
    email: str
    password: str
    
    
class UserRegister(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    
class UserGoogle(BaseModel):
    name: str


class User(BaseModel):
    name: str


class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    hashed_password: str
    email: str
    photo: str
    score: int
    is_active: bool
    