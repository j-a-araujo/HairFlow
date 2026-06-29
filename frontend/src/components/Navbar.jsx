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
                    className="navbar-brand"
                    to="/dashboard"
                >
                    HairFlow
                </Link>

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