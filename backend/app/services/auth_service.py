# Google OAuth flow
# Create JWT
# Register new user
# Handle username change constraint

from sqlalchemy.orm import Session
from app.repositories.user_repo import UserRepository
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:

    @staticmethod
    def register(db: Session, email: str, password: str):
        hashed = pwd_context.hash(password)
        return UserRepository.create(db, email, hashed)

    @staticmethod
    def authenticate(db: Session, email: str, password: str):
        user = UserRepository.get_by_email(db, email)
        if not user:
            return None
        if not pwd_context.verify(password, user.password):
            return None
        return user