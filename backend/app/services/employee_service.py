from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate

from fastapi import HTTPException
from uuid import UUID

class EmployeeService:

    @staticmethod
    def create_employee(
        db: Session,
        employee: EmployeeCreate,
    ):

        db_employee = Employee(
            first_name=employee.first_name,
            last_name=employee.last_name,
            email=employee.email,
            phone=employee.phone,
            speciality=employee.speciality,
        )

        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)

        return db_employee

    @staticmethod
    def list_employees(db: Session):

        return db.scalars(
            select(Employee)
        ).all()

    @staticmethod
    def get_employee(db: Session, employee_id: UUID):
        employee = db.get(Employee, employee_id)
        if employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")
        return employee
    
    @staticmethod
    def update_employee(
        db: Session,
        employee_id: UUID,
        employee: EmployeeCreate,
    ):
        db_employee = db.get(Employee, employee_id)
        if db_employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")

        db_employee.first_name = employee.first_name
        db_employee.last_name = employee.last_name
        db_employee.email = employee.email
        db_employee.phone = employee.phone
        db_employee.speciality = employee.speciality

        db.commit()
        db.refresh(db_employee)

        return db_employee
   
    @staticmethod
    def delete_employee(db: Session, employee_id: UUID):
        employee = EmployeeService.get_employee(db, employee_id)
        db.delete(employee)
        db.commit()
        