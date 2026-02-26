# create_user
# get_user_by_email
# get_user_by_id
# update_username

from sqlalchemy.orm import Session
from app.db.models.user import User

class UserRepository:

    @staticmethod
    def create(db: Session, email: str, password: str):
        user = User(email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()