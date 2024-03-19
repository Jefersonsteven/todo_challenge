from passlib.context import CryptContext
from ..database import crud, schemas
from typing import Union


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)

def authenticate_user(email: str, password: str) -> Union[str, schemas.User]:
    user = crud.get_user_by_email(email)
    if not user:
        return 'User not found'
    if not verify_password(password, user.hashed_password):
        return 'Password incorrect'
    return user