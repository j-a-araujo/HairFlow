from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate


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