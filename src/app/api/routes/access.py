from src.app.api.models import (
    UserLogin, 
    UserGoogle, 
    UserRegister
)
from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
async def login(user: UserLogin):
    return user # token session

@router.post("/login-google")
async def login_google(user: UserGoogle):
    return 'has iniciado sesion con google' # token session


@router.post("/logout/{id}")
async def logout(id: str):
    return f"{id}: se ha cerrado la sesión" # close session


@router.post("/signup")
async def register(user: UserRegister):
    return user # token session