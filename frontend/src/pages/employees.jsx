import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getEmployees,
    createEmployee,
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

    useEffect(() => {

        async function loadEmployees() {

            try {

                const data = await getEmployees();

                setEmployees(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadEmployees();

    }, []);

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        
        event.preventDefault();
        try {
            await createEmployee(form);
            const data = await getEmployees();
            setEmployees(data);
            setForm({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                speciality: "",
            });
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>
                    Employees
                </h2>

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
                    New Employee
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
                        Create Employee
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

                        </tr>

                    </thead>

                    <tbody>

                        {employees.map((employee) => (

                            <tr key={employee.id}>

                                <td>
                                    {employee.first_name} {employee.last_name}
                                </td>

                                <td>
                                    {employee.email}
                                </td>

                                <td>
                                    {employee.phone}
                                </td>

                                <td>
                                    {employee.speciality}
                                </td>

                                <td>
                                    {employee.active ? "Yes" : "No"}
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