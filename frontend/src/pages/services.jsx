import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getServices,
    createService,
    updateService,
    deleteService,
} from "../services/serviceService";

function Services() {

    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        duration: "",
        price: "",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadServices();

    }, []);

    async function loadServices() {

        try {

            const data = await getServices();

            setServices(data);

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

            const service = {
                ...form,
                duration: Number(form.duration),
                price: Number(form.price),
            };

            if (editingId) {

                await updateService(
                    editingId,
                    service
                );

            } else {

                await createService(service);

            }

            await loadServices();

            setForm({
                name: "",
                description: "",
                duration: "",
                price: "",
            });

            setEditingId(null);

            setShowForm(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(serviceId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) return;

        try {

            await deleteService(serviceId);

            await loadServices();

        } catch (error) {

            console.error(error);

        }

    }

    function handleEdit(service) {

        setEditingId(service.id);

        setForm({
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
        });

        setShowForm(true);

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>Services</h2>

                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(!showForm)}
                >
                    New Service
                </button>

                {showForm && (

                    <div className="card mb-4">

                        <div className="card-body">

                            <h4 className="mb-3">

                                {editingId ? "Edit Service" : "New Service"}

                            </h4>

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Service Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    placeholder="Duration (minutes)"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    step="0.01"
                                    placeholder="Price (€)"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                />

                                <button
                                    className="btn btn-success"
                                    type="submit"
                                >
                                    {editingId
                                        ? "Update Service"
                                        : "Create Service"}
                                </button>

                            </form>

                        </div>

                    </div>

                )}

                <table className="table table-striped mt-4">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Description</th>

                            <th>Duration</th>

                            <th>Price</th>

                            <th>Active</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {services.map((service) => (

                            <tr key={service.id}>

                                <td>{service.name}</td>

                                <td>{service.description}</td>

                                <td>{service.duration} min</td>

                                <td>{service.price} €</td>

                                <td>

                                    {service.active ? "Yes" : "No"}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(service)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(service.id)}
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

export default Services;