# UserCreate
# UserResponse
# Userupdate
# TokenResponse

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    is_admin: bool

class Token(BaseModel):
    access_token: str
    token_type: str

    model_config = {
        "from_attributes": True
    }