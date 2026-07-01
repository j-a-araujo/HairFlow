import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const auth = useAuth();

    const navigate = useNavigate();

    function handleLogout() {

        auth.logout();

        navigate("/");

    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/admin"
                >
                    HairFlow
                </Link>

                <div className="navbar-nav me-auto">

                    <Link
                        className="nav-link"
                        to="/admin"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link"
                        to="/employees"
                    >
                        Employees
                    </Link>

                    <Link
                        className="nav-link"
                        to="/services"
                    >
                        Services
                    </Link>

                    <Link
                        className="nav-link"
                        to="/appointments"
                    >
                        Appointments
                    </Link>

                </div>

                <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;