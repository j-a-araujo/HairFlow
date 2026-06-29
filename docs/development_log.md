# Development Log

## 2026-06-25

### Objetivos

- Configurar ambiente de desenvolvimento
- Configurar PostgreSQL
- Configurar FastAPI
- Criar estrutura do projeto
- Implementar primeiro endpoint

---

## Concluído

### Infraestrutura

- Ambiente virtual criado
- GitHub configurado
- PostgreSQL configurado
- FastAPI configurado
- SQLAlchemy configurado

### Estrutura

Criada arquitetura base do projeto.

### Base de Dados

- Modelo User criado
- Tabela users criada
- Ligação SQLAlchemy ↔ PostgreSQL

### API

- Router Users criado
- Endpoint POST /users/register implementado

### Segurança

- Password Hashing
- Validação com Pydantic
- UUID

---

## Problemas encontrados

- Configuração do Alembic
- email-validator em falta
- imports incorretos
- ficheiros não guardados
- configuração SQLAlchemy

Todos resolvidos.

---

## Próxima sessão

- Validação de email duplicado
- Melhor tratamento de erros
- Login