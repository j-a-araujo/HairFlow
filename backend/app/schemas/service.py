from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ServiceCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: str
    duration: int
    price: float


class ServiceResponse(BaseModel):
    id: UUID
    name: str
    description: str
    duration: int
    price: float
    active: bool

    model_config = ConfigDict(from_attributes=True)