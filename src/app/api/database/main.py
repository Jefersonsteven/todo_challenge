from . import models, schemas
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Depends
from .database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
## db_dependency = Annotated[Session, Depends(get_db)] # con este no funciona
db_dependency = SessionLocal() # con este si funciona

