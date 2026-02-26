# PostCreate
# PostResponse
# CommentCreate
# CommentResponse

from pydantic import BaseModel

class PostCreate(BaseModel):
    title: str
    content: str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    user_id: int

    class Config:
        orm_mode = True