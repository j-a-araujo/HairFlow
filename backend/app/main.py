from fastapi import FastAPI

from app.api.users import router as users_router

from app.db.base import Base
from app.db.session import engine

import app.models.user
import app.models.service
from app.api.services import router as services_router
import app.models.service
from app.api.employees import router as employees_router
import app.models.employee
import app.models.appointment
from app.api.appointments import router as appointments_router
import app.models.appointment

from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HairFlow API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(services_router)
app.include_router(employees_router)
app.include_router(appointments_router)
@app.get("/")
def root():
    return {
        "message": "HairFlow API is running!"
    }