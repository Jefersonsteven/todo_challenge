from src.app.api.database.schemas import UserCreate, UserLogin
from fastapi import APIRouter, HTTPException, FastAPI
from src.app.api.utils.validators import validate_login, validate_signup
from src.app.api.database import crud
from ..core.security import authenticate_user
from fastapi.security import  OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends
from ..auth.main import User
import uuid
from ..auth.encode import create_access_token

router = APIRouter()

@router.post("/login-google")
async def login_google(user: UserLogin):
    is_validate_login = validate_login(user)
    auth_user = authenticate_user(user.email, user.password)
    if is_validate_login != True:
        raise HTTPException(status_code=404, detail={"message": str(is_validate_login)})
    elif type(auth_user) == str:
        raise HTTPException(status_code=400, detail={"message": str(auth_user)})
    elif auth_user == 'User not found':
        random_password = uuid.uuid4().hex
        new_user = UserCreate(email=user.email, password=random_password, first_name=user.email, last_name=user.email)
        user = crud.create_user(new_user)
        return user  # TODO: token session


@router.post("/logout/{id}")
async def logout(id: str):
    return f"{id}: se ha cerrado la sesión" # close session


@router.post("/signup")
async def register(user: UserCreate):
    signup = validate_signup(user)
    if signup == True:
        user = crud.create_user(user)
        return user
    raise HTTPException(status_code=400, detail=str(signup))