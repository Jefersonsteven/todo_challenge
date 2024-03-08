from sqlalchemy import Column, Integer, String, UUID, Boolean, DateTime
from .database import Base
from enum import Enum

class Level(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

class Priority(Level):
    pass

class Difficulty(Level):
    pass

class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    hashed_password = Column(String)
    photo = Column(String)
    score = Column(Integer)
    
class Todo(Base):
    __tablename__ = 'todos'
    
    id = Column(UUID, primary_key=True)
    title = Column(String)
    description = Column(String)
    user_id = Column(UUID) # esta es la llave foranea para relacionar la tabla de usuarios con la tabla de tareas
    completed = Column(Boolean)
    target_date = Column(DateTime)
    portrait = Column(String)
    priority = Column(Priority)
    difficulty = Column(Difficulty)