from fastapi import APIRouter, HTTPException
from src.app.api.utils.validators import validate_login
from ..core.security import authenticate_user
from fastapi.security import  OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends
from ..auth.encode import create_access_token
from pydantic import BaseModel
from datetime import timedelta
from decouple import config

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str
    
ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES')

@router.post("/")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    is_validate_login = validate_login(form_data)
    auth_user = authenticate_user(form_data.username, form_data.password)
    if is_validate_login != True:
        raise HTTPException(status_code=404, detail={"message": str(is_validate_login)})
    elif type(auth_user) == str:
        raise HTTPException(status_code=401, detail={"message": str(auth_user)})
    
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(data={"sub": auth_user}, expires_delta=access_token_expires)
    
    return Token(access_token=access_token, token_type="bearer")