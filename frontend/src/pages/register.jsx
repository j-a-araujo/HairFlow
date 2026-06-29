import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "client",
    });

    const [error, setError] = useState("");

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await api.post(
                "/users/register",
                form
            );

            alert("Account created successfully. Awaiting approval.");

            navigate("/");

        } catch {

            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            setError("Failed to create account");

        }

    }

    return (

        <div className="container mt-5" style={{ maxWidth: "500px" }}>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="First Name"
                    name="first_name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <select
                    className="form-select mb-3"
                    name="role"
                    onChange={handleChange}
                >
                    <option value="client">
                        Client
                    </option>

                    <option value="employee">
                        Employee
                    </option>

                </select>

                {error &&

                    <div className="alert alert-danger">
                        {error}
                    </div>

                }

                <button
                    className="btn btn-primary w-100"
                >
                    Create Account
                </button>

            </form>

            <hr />

            <Link to="/">
                Back to Login
            </Link>

        </div>

    );

}

export default Register;