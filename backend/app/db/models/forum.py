# Defines:
# posts
# comments
# parent-child relationship for comments
# upvotes
# timestamps
# foreign key to user

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class ForumPost(Base):
    __tablename__ = "forum_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))