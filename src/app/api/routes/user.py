from fastapi import APIRouter, HTTPException, Depends
import uuid
from ..database.schemas import User
from ..database import crud
from ..auth.main import get_current_user
from typing import Annotated

router = APIRouter()

@router.get("/")
async def get_users(current_user: Annotated[str, Depends(get_current_user)]):
    users = crud.get_users()
    return users

@router.get("/{id}")
async def get_user(id: uuid.UUID | str, current_user: Annotated[str, Depends(get_current_user)]):
    if(type(id) == str):
        user = crud.get_user_by_email(id)
    else:
        user = crud.get_user(id)
        
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user
    

@router.put("/")
async def update_user(user: User, current_user: Annotated[str, Depends(get_current_user)]):
    user = crud.edit_user(user)
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user

    
@router.delete("/{id}")
async def delete_user(id: uuid.UUID, current_user: Annotated[str, Depends(get_current_user)]):
    user = crud.delete_user(id)
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')    
    return f"El usuario de correo: {user.email}, ha sido eliminado correctamente"
