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
    return user # token session


@router.put("/deactivate/{id}")
async def deactivate_user(user: User, id: uuid.UUID):
    return user # close session

    
@router.delete("/{id}")
async def delete_user(id: uuid.UUID):
    return id # close session