from decouple import config
from jose import jwt
from datetime import datetime, timedelta, timezone
from uuid import UUID

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES')
    
def create_access_token(username: str, user_id: UUID, expires_delta: timedelta):
    to_encode = { "sub": username, "id": str(user_id) }
    expires = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expires})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt

def verify_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload
