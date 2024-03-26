from src.app.api.database.schemas import UserCreate, UserLogin
from fastapi import APIRouter, HTTPException
from src.app.api.utils.validators import validate_login, validate_signup
from src.app.api.database import crud
from ..core.security import authenticate_user
from fastapi.security import  OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import Depends
import uuid
from ..auth.encode import create_access_token
from datetime import timedelta
from decouple import config
from ..database.schemas import Token
from ..auth.main import get_current_user

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES')

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


@router.post("/signup")
async def register(user: UserCreate):
    signup = validate_signup(user)
    if signup == True:
        user = crud.create_user(user)
        return user
    raise HTTPException(status_code=400, detail=str(signup))

@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    is_validate_login = validate_login(form_data)
    auth_user = authenticate_user(form_data.username, form_data.password)
    if is_validate_login != True:
        raise HTTPException(status_code=404, detail={"message": str(is_validate_login)})
    elif type(auth_user) == str:
        raise HTTPException(status_code=401, detail={"message": str(auth_user)})
    
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(auth_user.email, auth_user.id, access_token_expires)
    
    return {
        'user': {
            "id": auth_user.id,
            "email": auth_user.email,
            "first_name": auth_user.first_name,
            "last_name": auth_user.last_name,
            "photo": auth_user.photo,
            "is_active": auth_user.is_active,
            "score": auth_user.score,
            "verified": auth_user.verified,
            "created_at": auth_user.created_at,
            "updated_at": auth_user.updated_at
        }, 
        'token': Token(access_token=access_token, token_type="bearer")
    }

@router.post("/verify")
async def verify(current_user: Annotated[str, Depends(get_current_user)]):
    return {
        "email": current_user.email
    }