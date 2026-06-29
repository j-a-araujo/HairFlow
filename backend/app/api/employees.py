from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.services.employee_service import EmployeeService
from uuid import UUID
from fastapi import Response

router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=201,
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):
    return EmployeeService.create_employee(
        db,
        employee,
    )


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    db: Session = Depends(get_db),
):
    return EmployeeService.list_employees(db)

@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
):
    return EmployeeService.get_employee(db, employee_id)

@router.put(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def update_employee(
    employee_id: UUID,
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):
    return EmployeeService.update_employee(
        db,
        employee_id,
        employee,
    )

@router.delete(
    "/{employee_id}",
    status_code=204,
)
def delete_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
):
    EmployeeService.delete_employee(db, employee_id)
    return Response(status_code=204)