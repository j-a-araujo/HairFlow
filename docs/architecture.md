# Architecture

## Overview

HairFlow is a full-stack web application developed to help manage a hair salon.

The project is divided into two main parts:

- Frontend
- Backend

The frontend is responsible for the user interface, while the backend handles all the business logic and database communication.

---

# General Structure

```
React Frontend
        │
        │ HTTP Requests
        ▼
FastAPI Backend
        │
        ▼
PostgreSQL Database
```

The frontend communicates with the backend through REST API requests, and the backend stores all information in the PostgreSQL database.

---

# Frontend

The frontend was developed using React.

The project is organised into different folders to make the code easier to maintain.

```
src/

components/

pages/

services/

context/
```

### Pages

The pages contain the main screens of the application.

Some examples are:

- Login
- Register
- Admin Dashboard
- Employees
- Services
- Appointments

### Components

Components are reused in different pages.

For example:

- Navbar
- ProtectedRoute

### Services

The services folder contains all API requests made to the backend using Axios.

Keeping the requests in separate files makes the code cleaner.

### Context

React Context is used to store authentication information such as:

- JWT Token
- User role
- User ID

---

# Backend

The backend was developed using FastAPI.

To keep the project organised, the code was divided into different folders.

```
app/

api/

models/

schemas/

services/

db/

core/
```

### API

Contains all application routes.

Each route receives requests from the frontend and returns a response.

### Models

Models represent the database tables.

The project currently has models for:

- Users
- Employees
- Services
- Appointments

### Schemas

Schemas are used to validate data received by the API.

This helps prevent invalid information from being stored in the database.

### Services

The service layer contains most of the application's business logic.

Instead of placing all the code inside the API routes, each entity has its own service.

For example:

- UserService
- EmployeeService
- ServiceService
- AppointmentService

---

# Authentication

Authentication is done using JWT tokens.

When a user logs in:

1. The backend verifies the email and password.
2. A JWT token is generated.
3. The frontend stores the token.
4. Future requests include the token in the Authorization header.

Some pages are protected depending on the user's role.

---

# Database

The application uses PostgreSQL.

The main tables are:

- Users
- Employees
- Services
- Appointments

Appointments connect the other tables using foreign keys.

```
Users
   │
Appointments
   ▲
   │
Employees

Appointments
   │
Services
```

---

# Final Notes

One of the main goals while developing this project was to keep the code organised and challenge myself with new languages.

Separating the frontend from the backend and dividing the backend into API routes, services, models and schemas made the project easier to understand and maintain.

This structure should also make it easier to add new features in future versions of HairFlow.