from fastapi import APIRouter

from src.app.api.routes import home, todo, user, access, token

api_router = APIRouter()
api_router.include_router(home.router, prefix="/home", tags=["home"])
api_router.include_router(todo.router, prefix="/todo", tags=["todo"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(access.router, prefix="/access", tags=["access"])
api_router.include_router(token.router, prefix="/token", tags=["token"])