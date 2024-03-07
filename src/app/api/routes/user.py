from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_user():
    return # all todos

    

@router.put("/{id}")
async def update_user():
    return # updated todo
    
    
@router.delete("/{id}")
async def delete_user():
    return # deleted todo