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
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Tarangini API")

init_db()

app.include_router(auth_routes.router)

@app.get("/")
def health_check():
    return {"message": "Tarangini Backend Running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)