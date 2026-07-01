# Database

## Overview

The project uses PostgreSQL as the database.

The database is divided into four main tables:

- Users
- Employees
- Services
- Appointments

Each table stores different information needed by the application.

---

# Users

This table stores every user that can log into the system.

Fields:

| Field | Description |
|-------|-------------|
| id | User identifier (UUID) |
| first_name | User first name |
| last_name | User last name |
| email | User email (unique) |
| password_hash | Encrypted password |
| role | admin, employee or client |
| status | pending, active or rejected |

The password is never stored as plain text.

---

# Employees

Employees are stored in a separate table because they have information that normal users do not need.

Fields:

| Field | Description |
|-------|-------------|
| id | Employee identifier |
| first_name | Employee name |
| last_name | Employee surname |
| email | Employee email |
| phone | Contact number |
| speciality | Main speciality |
| active | Indicates if employee is active |

Employees are created automatically after an employee account is approved by the administrator.

---

# Services

This table stores all available salon services.

Fields:

| Field | Description |
|-------|-------------|
| id | Service identifier |
| name | Service name |
| description | Short description |
| duration | Estimated duration (minutes) |
| price | Service price |
| active | Indicates if service is available |

---

# Appointments

Appointments connect clients, employees and services.

Fields:

| Field | Description |
|-------|-------------|
| id | Appointment identifier |
| customer_id | Client |
| employee_id | Assigned employee |
| service_id | Selected service |
| appointment_date | Date and time |
| status | Appointment status |

Possible status values:

- pending
- confirmed
- cancelled

---

# Relationships

The relationships are simple.

```
User
   │
   │
Appointment
   ▲
   │
Employee

Appointment
   │
Service
```

Each appointment belongs to:

- one client
- one employee
- one service

---

# Notes

The database was designed to keep authentication separated from employee information.

This makes it easier to extend the project in the future without changing the authentication system.