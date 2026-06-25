from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

from sqlalchemy.orm import Session
engine = create_engine(
    settings.DATABASE_URL,  
    echo=True,
)

sessionlocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# o engine sabe abir ligações e reutil§izar ligações. 
# O sessionlocal sabe criar sessões que são usadas para interagir com a base de dados.

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()

# a cada pedido o API cria uma sessão e depois fecha a sessão.       