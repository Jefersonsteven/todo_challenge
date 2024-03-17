from src.app.api.database.schemas import UserCreate, UserLogin
from fastapi import APIRouter, Response
from src.app.api.utils.validators import validate_login, validate_signup
from src.app.api.database import crud

router = APIRouter()


@router.post("/login")
async def login(user: UserLogin):
    login = validate_login(user)
    if login == True:
        user = crud.get_user_by_email(user.email)
        return user # TODO: token session
    return Response(content=str(login), status_code=400) # error

@router.post("/login-google")
async def login_google(user: UserLogin):
    user = crud.get_user_by_email(user.email)
    return user # TODO: token session


@router.post("/logout/{id}")
async def logout(id: str):
    return f"{id}: se ha cerrado la sesión" # close session


@router.post("/signup")
async def register(user: UserCreate):
    signup = validate_signup(user)
    if signup == True:
        user = crud.create_user(user)
        return user
    return Response(content=str(signup), status_code=400)