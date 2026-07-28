from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Team Pillbox EMS API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "pillbox_ems_db"
    
    # Security
    SECRET_KEY: str = "SUPER_SECRET_PILLBOX_EMS_JWT_KEY_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 Days
    
    # Discord OAuth
    DISCORD_CLIENT_ID: str = "MOCK_DISCORD_CLIENT_ID"
    DISCORD_CLIENT_SECRET: str = "MOCK_DISCORD_CLIENT_SECRET"
    DISCORD_REDIRECT_URI: str = "http://localhost:3000/auth/discord/callback"

    class Config:
        env_file = ".env"

settings = Settings()
