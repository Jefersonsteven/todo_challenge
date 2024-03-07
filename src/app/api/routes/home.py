from fastapi import APIRouter
from typing import Union
from pydantic import BaseModel
import uuid

router = APIRouter()

# saludo
@router.get("/")
def hello_world(username: Union[str | None] = "World"):
    return {"message": f"Hello {username}"}

# encontrar el id
@router.get("/{id}")
def get_item(id: int):
    id = int(id)
    return { "id": id }

class User(BaseModel):
    name: str
    age: int
    is_admin: bool
    id: Union[uuid.UUID, None] = None

# registrar usuario
@router.post("/")
def create_user(user: User):
    # crear un uuid
    user.id = uuid.uuid4()
    return { "user": user }