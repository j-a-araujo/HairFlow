# HairFlow

HairFlow is a full-stack web application developed to manage a hair salon.

The system provides role-based access control for administrators, employees and clients, allowing appointment management, employee administration and service management through a modern web interface.

---

## Features

### Authentication

- JWT Authentication
- Password hashing
- Role-based access
- User approval workflow

### Administration

- Approve new users
- Employee management
- Service management
- Appointment management

### Employees

- View appointments
- Manage appointments

### Clients

- Register account
- Login
- Create appointments
- View appointments

---

## Technologies

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT

### Frontend

- React
- React Router
- Axios
- Bootstrap

---

## Project Structure

backend/
frontend/

---

## Installation

### Backend

cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload

### Frontend

cd frontend

npm install

npm run dev

---

## User Roles

Admin

Employee

Client

---

## Current Version

Version 1.0

---

## Future Work

See FUTURE_VERSION_2.0.md