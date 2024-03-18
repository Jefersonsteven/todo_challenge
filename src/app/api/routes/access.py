from src.app.api.database.schemas import UserCreate, UserLogin
from fastapi import APIRouter, HTTPException
from src.app.api.utils.validators import validate_login, validate_signup
from src.app.api.database import crud

router = APIRouter()


@router.post("/login")
async def login(user: UserLogin):
    validate_login = validate_login(user)
    user = crud.get_user_by_email(user.email)
    if validate_login == True and user: # TODO: validate password
        return user # TODO: token session
    raise HTTPException(status_code=404, detail={"message": 'User not found', "content": str(login)}) # error

@router.post("/login-google")
async def login_google(user: UserLogin):
    validate_login = validate_login(user)
    user = crud.get_user_by_email(user.email)
    if validate_login == True and user: # TODO: validate password
        return user # TODO: token session
    elif not user:
        user = crud.create_user(user)
        return user # TODO: token session
    raise HTTPException(status_code=404, detail={"message": 'User not found', "content": str(login)}) # error


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