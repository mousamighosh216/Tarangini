# Centralized config loader
# Load environment variables (.env)
# DB URL
# JWT secret
# OAuth credentials
# Model path
# Environment (dev/prod)
# Return config object accessible everywhere.

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Tarangini"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./tarangini.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    ALGORITHM: str = "HS256"

settings = Settings()