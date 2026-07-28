from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

# ------------------------------------
# Database Connection URL
# ------------------------------------

DATABASE_URL = (
    f"postgresql://"
    f"{settings.DATABASE_USER}:"
    f"{settings.DATABASE_PASSWORD}@"
    f"{settings.DATABASE_HOST}:"
    f"{settings.DATABASE_PORT}/"
    f"{settings.DATABASE_NAME}"
)

# ------------------------------------
# SQLAlchemy Engine
# ------------------------------------

engine = create_engine(
    DATABASE_URL,
    echo=True
)

# ------------------------------------
# Session Factory
# ------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ------------------------------------
# Base Class for Models
# ------------------------------------

Base = declarative_base()


# ------------------------------------
# Database Dependency
# ------------------------------------

def get_db():
    """
    Creates a new database session for each request
    and closes it automatically after the request ends.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()