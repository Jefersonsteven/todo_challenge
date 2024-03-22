from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime as DateTime

class UserBase(BaseModel):
    email: str
    
class UserLogin(UserBase):
    password: str
    
class UserCreate(UserLogin):
    first_name: str
    last_name: str
    
class User(UserCreate):
    id: UUID
    photo: str
    score: int
    
class UserAuth(UserBase):
    id: UUID
    first_name: str
    last_name: str
    photo: str
    score: int
    
    class Config:
            from_attributes = True
    
class TodoBase(BaseModel):
    title: str
    description: str
    
    
class TodoCreate(TodoBase):
    portrait: Optional[str]
    priority: int
    difficulty: int
    target_date: DateTime
    
class Todo(TodoCreate):
    id: UUID
    completed: bool
    
    class Config:
        from_attributes = True
    
    
class Token(BaseModel):
    access_token: str
    token_type: str


    

    