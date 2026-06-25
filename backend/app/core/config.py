from dotenv import load_dotenv
import os
# fazemos isto porque muda entre pc local e produção. Nâo quero passwords expostas no código. Então, coloco as variáveis de ambiente em um arquivo .env e leio ele aqui.
load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")

settings = Settings()