from fastapi import APIRouter
import uuid
from src.app.api.database.schemas import User
from src.app.api.database import crud

router = APIRouter()

@router.get("/")
async def get_users():
    users = crud.get_users()
    return users 

@router.get("/{id}")
async def get_user(id: uuid.UUID):
    user = crud.get_user(id)
    return user
    

@router.put("/")
async def update_user(user: User, id: uuid.UUID):
    user = crud.edit_user(user)
    return user # token session

    
@router.delete("/{id}")
async def delete_user(id: uuid.UUID):
    user = crud.delete_user(id)
    return user # close session