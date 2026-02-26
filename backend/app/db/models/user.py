# Defines:
# id
# email
# username
# username_changed
# created_at
# role
# health profile relationship
# forum relationship
# bookings relationship
# No business logic.

from sqlalchemy import Column, Integer, String, Boolean
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)