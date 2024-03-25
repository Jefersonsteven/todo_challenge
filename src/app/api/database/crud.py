from . import models, schemas, main
from sqlalchemy.orm import Session
import uuid
from typing import Union
from ..core.security import get_password_hash
from datetime import datetime, timezone
from fastapi import HTTPException

# * User CRUD

def get_users(skip: int = 0, limit: int = 100, db: Session = main.db_dependency):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user(user_id: uuid.UUID, db: Session = main.db_dependency):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(email: str, db: Session = main.db_dependency):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(user: schemas.UserCreate, db: Session = main.db_dependency):
    hashed_password = get_password_hash(user.password)
    print(user.email, user.first_name, user.last_name, hashed_password)
    try:
        db_user = models.User(
            id= uuid.uuid4(),
            email=user.email, 
            hashed_password=hashed_password,
            first_name=user.first_name,
            last_name=user.last_name,
            photo= "none",
            score= 0,
            created_at= datetime.now(timezone.utc),
            updated_at= datetime.now(timezone.utc),
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception:
        raise HTTPException(status_code=400, detail="User already exists")
        

def edit_user(user: schemas.User, db: Session = main.db_dependency):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db_user.photo = user.photo
    db_user.score = user.score
    db_user.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(user_id: uuid.UUID, db: Session = main.db_dependency):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user


# * Todo CRUD

def get_todos(skip: int = 0, limit: int = 100, user_id: Union[uuid.UUID | None] = None, db: Session = main.db_dependency):
    if user_id is None:
        return db.query(models.Todo).offset(skip).limit(limit).all()
    return db.query(models.Todo).filter(models.Todo.user_id == user_id).offset(skip).limit(limit).all()

def get_todo_by_title(title: str, db: Session = main.db_dependency):
    return db.query(models.Todo).filter(models.Todo.title == title).first()

def create_todo(todo: schemas.TodoCreate, user_id: uuid.UUID, db: Session = main.db_dependency):
    new_todo = dict(todo)
    new_todo["id"] = uuid.uuid4()
    new_todo["user_id"] = user_id
    new_todo["completed"] = False
    new_todo["created_at"] = datetime.now(timezone.utc)
    db_todo = models.Todo(**dict(new_todo))
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def edit_todo(todo: schemas.Todo, user_id: uuid.UUID, db: Session = main.db_dependency):
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

def delete_todo(todo_id: uuid.UUID, db: Session = main.db_dependency):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    db.delete(db_todo)
    db.commit()
    return db_todo


