from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
async def login():
    return # login user


@router.post("/logout")
async def logout():
    return # logout user


@router.post("/register")
async def register():
    return # register user