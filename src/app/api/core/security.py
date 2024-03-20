from passlib.context import CryptContext
from ..database import crud
from typing import Union
from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    photo: str
    score: int

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)

def authenticate_user(email: str, password: str) -> Union[str, User]:
    user = crud.get_user_by_email(email)
    if not user:
        return 'User not found'
    if not verify_password(password, user.hashed_password):
        return 'Password incorrect'
    return {
        'id': str(user.id),
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'photo': user.photo,
        'score': user.score
    }