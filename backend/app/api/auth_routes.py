# POST /login/google
# GET /me
# PATCH /username

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserOut
from app.services.auth_service import AuthService
from app.db.session import SessionLocal

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return AuthService.register(db, user.email, user.password)

@router.post("/login", response_model=UserOut)
def login(user: UserCreate, db: Session = Depends(get_db)):
    auth_user = AuthService.authenticate(db, user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return auth_user