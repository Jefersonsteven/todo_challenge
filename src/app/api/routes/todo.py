from fastapi import APIRouter
from src.app.api.database import crud, schemas
import uuid

router = APIRouter()


@router.get("/{id}")
async def get_todos(id: uuid.UUID = None):
    todos = crud.get_todos()
    return todos


@router.post("/{id}")
async def create_todo(todo: schemas.TodoCreate, id: int):
    todo = crud.create_todo(todo, id)
    return todo
    

@router.put("/{id}")
async def update_todo(todo: schemas.Todo, id: int):
    todo = crud.edit_todo(todo, id)
    return todo
    
    
@router.delete("/{id}")
async def delete_todo(id: uuid.UUID):
    todo = crud.delete_todo(id)
    return todo # deleted todo