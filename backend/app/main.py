# Role: Application entry point
# Must:
# Initialize FastAPI app
# Load config
# Include routers (auth, forum, cycle, consultant, booking, prediction)
# Setup CORS
# Setup middleware (logging, error handling)
# Mount docs endpoint
# Startup event → initialize DB
# Health check endpoint
# Must NOT:
# Contain business logic
# Contain DB queries

from fastapi import FastAPI
from app.api import auth_routes, forum_routes
from app.db.session import get_db
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_db   # ✅ ADD THIS

app = FastAPI()

@app.on_event("startup")
def on_startup():
    # 1️⃣ Create tables first
    init_db()

    # 2️⃣ Then create admin user
    db: Session = next(get_db())
    try:
        auth_routes.create_admin_user(db)
    finally:
        db.close()

# Include router
app.include_router(auth_routes.router)
app.include_router(forum_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend origin like "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)