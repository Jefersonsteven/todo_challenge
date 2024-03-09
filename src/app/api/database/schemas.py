from pydantic import BaseModel
from enum import Enum
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
    is_active: bool
    
    class Config:
            orm_mode = True

class Level(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    
class TodoBase(BaseModel):
    title: str
    description: str
    
    
class TodoCreate(TodoBase):
    user_id: UUID
    portrait: Optional[str]
    priority: int
    difficulty: int
    target_date: DateTime
    
class Todo(TodoCreate):
    id: UUID
    completed: bool
    
    class Config:
        orm_mode = True
    


    

    