from src.app.api.models import (
    UserLogin, 
    UserGoogle, 
    UserRegister
)
from fastapi import APIRouter, Response
from src.app.api.utils.validators import validate_login, validate_signup

router = APIRouter()


@router.post("/login")
async def login(user: UserLogin):
    login = validate_login(user)
    if login == True:
        return user # token session
    return Response(content=str(login), status_code=400) # error

@router.post("/login-google")
async def login_google(user: UserGoogle):
    return 'has iniciado sesion con google' # token session


@router.post("/logout/{id}")
async def logout(id: str):
    return f"{id}: se ha cerrado la sesión" # close session


@router.post("/signup")
async def register(user: UserRegister):
    signup = validate_signup(user)
    if signup == True:
        return user # token session
    return Response(content=str(signup), status_code=400) # error