from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_todos():
    return # all todos


@router.post("/")
async def create_todo():
    return # new todo
    

@router.put("/{id}")
async def update_todo():
    return # updated todo
    
    
@router.delete("/{id}")
async def delete_todo():
    return # deleted todo