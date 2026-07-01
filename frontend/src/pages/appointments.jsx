import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "../services/appointmentService";

import { getEmployees } from "../services/employeeService";
import { getServices } from "../services/serviceService";
import { getClients } from "../services/userService";

function Appointments() {

    const [appointments, setAppointments] = useState([]);

    const [clients, setClients] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [services, setServices] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({

        customer_id: "",

        employee_id: "",

        service_id: "",

        appointment_date: "",

        status: "pending",

    });
    
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const appointmentsData =
                await getAppointments();

            const clientsData =
                await getClients();

            const employeesData =
                await getEmployees();

            const servicesData =
                await getServices();

            setAppointments(
                appointmentsData
            );

            setClients(
                clientsData
            );

            setEmployees(
                employeesData
            );

            setServices(
                servicesData
            );

        } catch (error) {

            console.error(error);

        }

    }

    function handleChange(event) {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value,

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const appointmentData = {

                ...form,

                customer_id:
                    role === "client"
                        ? userId
                        : form.customer_id,

            };

            if (editingId) {

                await updateAppointment(
                    appointmentData,
                    editingId,
                    appointmentData
                );

            } else {

                await createAppointment(
                    appointmentData
                );

            }

            await loadData();

            setForm({

                customer_id: "",

                employee_id: "",

                service_id: "",

                appointment_date: "",

                status: "pending",

            });

            setEditingId(null);

            setShowForm(false);

        } catch (error) {

            console.error(error);

        }

    }

    function handleEdit(appointment) {

        setEditingId(
            appointment.id
        );

        setForm({

            customer_id:
                appointment.customer_id,

            employee_id:
                appointment.employee_id,

            service_id:
                appointment.service_id,

            appointment_date:
                appointment.appointment_date.slice(
                    0,
                    16
                ),

            status:
                appointment.status,

        });

        setShowForm(true);

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(

            "Delete this appointment?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteAppointment(id);

            await loadData();

        } catch (error) {

            console.error(error);

        }
    }

    function getClientName(id) {
        const client = clients.find(
            (client) => client.id === id
        );
        return client
            ? `${client.first_name} ${client.last_name}`
            : id;
    }

    function getEmployeeName(id) {
        const employee = employees.find(
            (employee) => employee.id === id
        );
        return employee
            ? `${employee.first_name} ${employee.last_name}`
            : id;
    }

    function getServiceName(id) {
        const service = services.find(
            (service) => service.id === id
        );
        return service
            ? service.name
            : id;
    }

    const filteredAppointments =
        role === "client"
            ? appointments.filter(
                (appointment) =>
                    appointment.customer_id === userId
            )
            : appointments;

        return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>Appointments</h2>

                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(!showForm)}
                >
                    New Appointment
                </button>

                {showForm && (

                    <div className="card mb-4">

                        <div className="card-body">

                            <h4 className="mb-3">

                                {editingId
                                    ? "Edit Appointment"
                                    : "New Appointment"}

                            </h4>

                            <form onSubmit={handleSubmit}>

                                {role !== "client" && (
                                    <select
                                        className="form-select mb-3"
                                        name="customer_id"
                                        value={form.customer_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Client
                                        </option>

                                        {clients.map((client) => (

                                            <option
                                                key={client.id}
                                                value={client.id}
                                            >

                                                {client.first_name} {client.last_name}

                                            </option>

                                        ))}

                                    </select>
                                )}

                                <select
                                    className="form-select mb-3"
                                    name="employee_id"
                                    value={form.employee_id}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((employee) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >

                                            {employee.first_name} {employee.last_name}

                                        </option>

                                    ))}

                                </select>

                                <select
                                    className="form-select mb-3"
                                    name="service_id"
                                    value={form.service_id}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Service
                                    </option>

                                    {services.map((service) => (

                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >

                                            {service.name}

                                        </option>

                                    ))}

                                </select>

                                <input
                                    className="form-control mb-3"
                                    type="datetime-local"
                                    name="appointment_date"
                                    value={form.appointment_date}
                                    onChange={handleChange}
                                />

                                {editingId && (

                                    <select
                                        className="form-select mb-3"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >

                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="confirmed">
                                            Confirmed
                                        </option>

                                        <option value="cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                )}

                                <button
                                    className="btn btn-success"
                                    type="submit"
                                >

                                    {editingId
                                        ? "Update Appointment"
                                        : "Create Appointment"}

                                </button>

                            </form>

                        </div>

                    </div>

                )}

                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th>Customer</th>

                            <th>Employee</th>

                            <th>Service</th>

                            <th>Date</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredAppointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td>

                                    {getClientName(
                                        appointment.customer_id
                                    )}

                                </td>

                                <td>

                                    {getEmployeeName(
                                        appointment.employee_id
                                    )}

                                </td>

                                <td>

                                    {getServiceName(
                                        appointment.service_id
                                    )}

                                </td>

                                <td>

                                    {new Date(
                                        appointment.appointment_date
                                    ).toLocaleString()}

                                </td>

                                <td>

                                    {appointment.status}

                                </td>

                                <td>

                                    {role !== "client" && (
                                        
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(appointment)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(appointment.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Appointments;
