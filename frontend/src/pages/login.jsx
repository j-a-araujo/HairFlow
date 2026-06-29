import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        try {

            const response = await api.post("/users/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            navigate("/dashboard");

        } catch {

            setError("Invalid email or password.");
        }
    }

    return (

        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <h2 className="mb-4">
                HairFlow Login
            </h2>

            <form onSubmit={handleLogin}>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                <button
                    className="btn btn-primary w-100"
                    type="submit"
                >
                    Login
                </button>

            </form>

            <hr />

            <p>

                Don't have an account?

                <Link to="/register">
                    {" "}Register
                </Link>

            </p>

        </div>

    );

}

export default Login;