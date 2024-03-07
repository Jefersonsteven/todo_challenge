from fastapi import APIRouter

from src.app.api.routes import home, todo, user

api_router = APIRouter()
api_router.include_router(home.router, prefix="/home", tags=["home"])
api_router.include_router(todo.router, prefix="/todo", tags=["todo"])
api_router.include_router(user.router, prefix="/user", tags=["user"])