from . import models, schemas, main
from sqlalchemy.orm import Session
import uuid

# * User CRUD

def get_users(skip: int = 0, limit: int = 100, db: Session = main.db_dependency):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user(user_id: int, db: Session = main.db_dependency):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(email: str, db: Session = main.db_dependency):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(user: schemas.UserCreate, db: Session = main.db_dependency):
    hashed_password = user.password + "notreallyhashed" #TODO:: Hash the password
    db_user = models.User(
        id= uuid.uuid4(),
        email=user.email, 
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        photo= "none",
        score= 0
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# * Todo CRUD

def get_todos(skip: int = 0, limit: int = 100, user_id: int = None, db: Session = main.db_dependency):
    if user_id is None:
        return db.query(models.Todo).offset(skip).limit(limit).all()
    return db.query(models.Todo).filter(models.Todo.user_id == user_id).offset(skip).limit(limit).all()

def get_todo_by_title(title: str, db: Session = main.db_dependency):
    return db.query(models.Todo).filter(models.Todo.title == title).first()

def create_todo(todo: schemas.TodoCreate, user_id: int, db: Session = main.db_dependency):
    db_todo = models.Todo(**dict(todo), user_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def edit_todo(todo: schemas.Todo, user_id: int, db: Session = main.db_dependency):
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


