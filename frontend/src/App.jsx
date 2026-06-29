import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Employees from "./pages/Employees";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";

import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ClientDashboard from "./pages/ClientDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Admin */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

                {/* Employee */}

                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Client */}

                <Route
                    path="/client"
                    element={
                        <ProtectedRoute>
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;