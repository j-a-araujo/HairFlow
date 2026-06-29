from fastapi import FastAPI

from app.api.users import router as users_router

from app.db.base import Base
from app.db.session import engine

import app.models.user
import app.models.service
from app.api.services import router as services_router
import app.models.service

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HairFlow API",
    version="1.0.0"
)

app.include_router(users_router)
app.include_router(services_router)

@app.get("/")
def root():
    return {
        "message": "HairFlow API is running!"
    }