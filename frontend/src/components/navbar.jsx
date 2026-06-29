import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                     HairFlow
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link className="nav-link" to="/">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/employees">
                        Employees
                    </Link>

                    <Link className="nav-link" to="/services">
                        Services
                    </Link>

                    <Link className="nav-link" to="/appointments">
                        Appointments
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;