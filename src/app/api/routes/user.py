from fastapi import APIRouter, HTTPException
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
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user
    

@router.put("/")
async def update_user(user: User):
    user = crud.edit_user(user)
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user # TODO: new session token

    
@router.delete("/{id}")
async def delete_user(id: uuid.UUID):
    user = crud.delete_user(id)
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')    
    return f"El usuario de correo: {user.email}, ha sido eliminado correctamente"
    # TODO: close session