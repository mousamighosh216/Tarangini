# create_user
# get_user_by_email
# get_user_by_id
# update_username

from sqlalchemy.orm import Session
from app.db.models.user import User
from typing import Optional

class UserRepository:

    @staticmethod
    def create(db: Session, email: str, password: str, is_admin=False):
        user = User(email=email, password=password, is_admin=is_admin)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()