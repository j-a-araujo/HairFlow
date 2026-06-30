import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        speciality: "",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadEmployees();

    }, []);

    async function loadEmployees() {

        try {

            const data = await getEmployees();

            setEmployees(data);

        } catch (error) {

            console.error(error);

        }

    }

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            if (editingId) {

                await updateEmployee(
                    editingId,
                    form
                );

            } else {

                await createEmployee(form);

            }

            await loadEmployees();

            setForm({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                speciality: "",
            });

            setEditingId(null);

            setShowForm(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(employeeId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;

        try {

            await deleteEmployee(employeeId);

            await loadEmployees();

        } catch (error) {

            console.error(error);

        }

    }

    function handleEdit(employee) {

        setEditingId(employee.id);

        setForm({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            phone: employee.phone,
            speciality: employee.speciality,
        });

        setShowForm(true);

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>Employees</h2>

                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(!showForm)}
                >
                    New Employee
                </button>

                {showForm && (

                    <div className="card mb-4">

                        <div className="card-body">

                            <h4 className="mb-3">

                                {editingId ? "Edit Employee" : "New Employee"}

                            </h4>

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="First Name"
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Last Name"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Speciality"
                                    name="speciality"
                                    value={form.speciality}
                                    onChange={handleChange}
                                />

                                <button
                                    className="btn btn-success"
                                    type="submit"
                                >
                                    {editingId
                                        ? "Update Employee"
                                        : "Create Employee"}
                                </button>

                            </form>

                        </div>

                    </div>

                )}

                <table className="table table-striped mt-4">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Speciality</th>

                            <th>Active</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {employees.map((employee) => (

                            <tr key={employee.id}>

                                <td>

                                    {employee.first_name} {employee.last_name}

                                </td>

                                <td>{employee.email}</td>

                                <td>{employee.phone}</td>

                                <td>{employee.speciality}</td>

                                <td>

                                    {employee.active ? "Yes" : "No"}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Employees;