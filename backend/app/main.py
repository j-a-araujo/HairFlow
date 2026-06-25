from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine

import app.models.user  

app = FastAPI(
    title="HairFlow API",
    version="1.0.0",
    description="Smart Appointment Management Platform"
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {
        "message": "HairFlow API is running!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }