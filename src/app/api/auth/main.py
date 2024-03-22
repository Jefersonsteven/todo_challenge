from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from fastapi import Depends, status, HTTPException
from .encode import verify_token
from typing import Annotated
from ..database.crud import get_user_by_email
from jose import JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/access/login")

class User(BaseModel):
    username: str
    password: str
    
class TokenData(BaseModel):
    username: str | None = None
    
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credencials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail='Invalid authentication credentials',
        headers={"WWW-Authenticate": "Bearer"}
    )
    
    try:
        payload = verify_token(token)
        username: str = payload.get('sub')
        if username is None:
            raise credencials_exception
        token_data = TokenData(username=username)
    except JWTError as e:
        raise credencials_exception
    user = get_user_by_email(token_data.username)
    if user is None:
        raise credencials_exception
    return user