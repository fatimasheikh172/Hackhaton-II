from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    Follows the configuration guidelines in @backend/CLAUDE.md.
    """
    # Database settings
    DATABASE_URL: str = "sqlite:///./todo_app.db"

    # Authentication settings
    BETTER_AUTH_SECRET: str = "your-super-secret-key-change-me"

    # JWT settings
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"  # Strong default key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes (more secure)

    # Application settings
    APP_NAME: str = "Todo Application"
    DEBUG: bool = True
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()