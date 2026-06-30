import api from "./api";

export async function getEmployees() {

    const response = await api.get("/employees");

    return response.data;

}

export async function createEmployee(employee) {

    const response = await api.post(
        "/employees",
        employee
    );

    return response.data;

}