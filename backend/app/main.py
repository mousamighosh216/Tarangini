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
from app.api import auth_routes
from app.db.session import get_db
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.on_event("startup")
def on_startup():
    # Create admin user
    db: Session = next(get_db())
    auth_routes.create_admin_user(db)

# Include router
app.include_router(auth_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend origin like "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)