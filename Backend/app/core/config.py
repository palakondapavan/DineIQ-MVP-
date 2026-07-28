from dotenv import load_dotenv
import os

load_dotenv()


class Settings:

    # -------------------------
    # Database
    # -------------------------

    DATABASE_HOST = os.getenv("DATABASE_HOST")

    DATABASE_PORT = os.getenv("DATABASE_PORT")

    DATABASE_NAME = os.getenv("DATABASE_NAME")

    DATABASE_USER = os.getenv("DATABASE_USER")

    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

    # -------------------------
    # JWT Authentication
    # -------------------------

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "restaurant-management-secret-key"
    )

    ALGORITHM = os.getenv(
        "ALGORITHM",
        "HS256"
    )

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            60
        )
    )


settings = Settings()