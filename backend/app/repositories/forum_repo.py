# create_post
# create_comment
# get_post
# get_all_posts
# get_comments_by_post

from sqlalchemy.orm import Session
from app.db.models.forum import Post, Comment

def create_post(db: Session, post: Post):
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_all_posts(db: Session):
    return db.query(Post).all()

def get_post_with_comments(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def create_comment(db: Session, comment: Comment):
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
