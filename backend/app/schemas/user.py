from typing import Literal

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from uuid import UUID
#serve para validar os dados de entrada do utlizador.
class UserCreate(BaseModel):
    first_name: str = Field(min_length=2, max_length=50)
    
    last_name: str = Field(min_length=2, max_length=50)
    
    email: EmailStr
    
    password: str = Field(min_length=8, max_length=130)
    
    role: Literal["client", "employee"] 

class UserResponse(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    email: EmailStr
    role: str
    status: str
    model_config = ConfigDict(from_attributes=True)

#criou-se 2 schemas o que o cliente envia e o que 
#devolvemos. sem password. 
class UserLogin(BaseModel):

    email: EmailStr

    password: str


class Token(BaseModel):

    access_token: str

    token_type: str
    
    role:str