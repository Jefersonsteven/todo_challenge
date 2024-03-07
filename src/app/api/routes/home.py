from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def hello_world(username: str = "World"):
    return {"message": f"Hello {username}"}

@router.get("/{id}")
def get_item(id: int):
    id = int(id)
    return { "id": id }