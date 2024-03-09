from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal
from typing import Annotated
from fastapi import Depends

# * Dependency Injection 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]

# * User CRUD

def get_user(db: db_dependency, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: db_dependency, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: db_dependency, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: db_dependency, user: schemas.UserCreate):
    hashed_password = user.password + "notreallyhashed" #TODO:: Hash the password
    db_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# * Todo CRUD

def get_todos(db: db_dependency, skip: int = 0, limit: int = 100, user_id: int = None):
    if user_id is None:
        return db.query(models.Todo).offset(skip).limit(limit).all()
    return db.query(models.Todo).filter(models.Todo.user_id == user_id).offset(skip).limit(limit).all()

def get_todo_by_title(db: db_dependency, title: str):
    return db.query(models.Todo).filter(models.Todo.title == title).first()

def create_todo(db: db_dependency, todo: schemas.TodoCreate, user_id: int):
    db_todo = models.Todo(**dict(todo), user_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def edit_todo(db: db_dependency, todo: schemas.Todo, user_id: int):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo.id).first()
    db_todo.title = todo.title
    db_todo.description = todo.description
    db_todo.completed = todo.completed
    db_todo.target_date = todo.target_date
    db_todo.portrait = todo.portrait
    db_todo.priority = todo.priority
    db_todo.difficulty = todo.difficulty
    db.commit()
    db.refresh(db_todo)
    return db_todo


