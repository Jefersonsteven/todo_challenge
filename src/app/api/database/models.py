from sqlalchemy import Column, Integer, String, UUID, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from .schemas import Level


class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID, primary_key=True)
    first_name = Column(String, index=True)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    photo = Column(String)
    score = Column(Integer, index=True)
    
    todos = relationship('Todo', back_populates='user')
    
class Todo(Base):
    __tablename__ = 'todos'
    
    id = Column(UUID, primary_key=True)
    title = Column(String, index=True)
    description = Column(String)
    user_id = Column(UUID, ForeignKey('users.id'))
    completed = Column(Boolean, index=True)
    target_date = Column(DateTime, index=True)
    portrait = Column(String)
    priority = Column(Level, index=True)
    difficulty = Column(Level, index=True)
    
    user = relationship('User', back_populates='todos')