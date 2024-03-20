from email_validator import validate_email, EmailNotValidError
from src.app.api.database.schemas import (
    UserLogin,
    UserCreate
)
from fastapi.security import  OAuth2PasswordRequestForm
import re
from typing import Union

# Validators

# validate_email_address: Valida que el email sea correcto
def validate_email_address(email: str):
    try:
        validate_email(email)
        return True
    except EmailNotValidError as e:
        return str(e)
    
    
# validate_password: Valida que la contraseña tenga al menos 8 caracteres, una letra, un número y un símbolo
def validate_password(password: str):
    if re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$', password) is None:
        return True
    else:
        return "La contraseña debe tener al menos 8 caracteres, una letra, un número y un símbolo"


# validate_name: Valida que el nombre solo contenga letras
def validate_name(first_name: Union[str | None] = None, last_name: Union[str | None] = None):
    if first_name and re.match(r'^[a-zA-Z]+$', first_name) is None: # 
        return "El nombre debe contener solo letras"
    elif last_name and re.match(r'^[a-zA-Z]+$', last_name) is None:
        return "El apellido debe contener solo letras"
    else:
        return True
    
# validate_login: Valida que el email y la contraseña sean correctos
def validate_login(user: OAuth2PasswordRequestForm): # 
    email = validate_email_address(user.username)
    password = validate_password(user.password)
    if email == True and password == True:
        return True
    else:
        return [email, password]
    
# validate_signup: Valida que el email, la contraseña y el nombre y el apellido sean correctos
def validate_signup(user: UserCreate):
    email = validate_email_address(user.email)
    password = validate_password(user.password)
    first_name = validate_name(first_name=user.first_name)
    last_name = validate_name(last_name=user.last_name)
    if email == True and password == True and first_name == True and last_name == True:
        return True
    else:
        return [email, password, first_name, last_name]