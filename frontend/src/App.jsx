import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/employees" element={<Employees />} />

                <Route path="/services" element={<Services />} />

                <Route path="/appointments" element={<Appointments />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;