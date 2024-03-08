from fastapi import APIRouter
import uuid
from src.app.api.models import UserUpdate

router = APIRouter()


@router.get("/{id}")
async def get_user(id: uuid.UUID):
    return id # user

    

@router.put("/")
async def update_user(user: UserUpdate, id: uuid.UUID):
    return user # token session


@router.put("/deactivate/{id}")
async def deactivate_user(user: UserUpdate, id: uuid.UUID):
    return user # close session

    
@router.delete("/{id}")
async def delete_user(id: uuid.UUID):
    return id # close session