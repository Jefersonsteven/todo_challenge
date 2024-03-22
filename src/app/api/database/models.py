from sqlalchemy import Column, Integer, String, UUID, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base

class LevelType(Enum):
    low = 1
    medium = 2
    high = 3


class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID, primary_key=True, unique=True)
    first_name = Column(String, index=True)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    photo = Column(String)
    score = Column(Integer, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, index=True)
    updated_at = Column(DateTime)
    
    todos = relationship('Todo', back_populates='user')
    
class Todo(Base):
    __tablename__ = 'todos'
    
    id = Column(UUID, primary_key=True, unique=True)
    title = Column(String, index=True)
    description = Column(String)
    user_id = Column(UUID, ForeignKey('users.id'))
    completed = Column(Boolean, index=True)
    target_date = Column(DateTime, index=True)
    portrait = Column(String)
    priority = Column(String, index=True)
    difficulty = Column(String, index=True)
    created_at = Column(DateTime)
    
    user = relationship('User', back_populates='todos')