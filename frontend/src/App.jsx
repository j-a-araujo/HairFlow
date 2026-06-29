import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <div className="container mt-4">

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/employees" element={<Employees />} />

                    <Route path="/services" element={<Services />} />

                    <Route path="/appointments" element={<Appointments />} />

                    <Route path="/login" element={<Login />} />

                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default App;