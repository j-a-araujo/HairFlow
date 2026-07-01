import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getDashboardData } from "../services/dashboardService";

import {
    getPendingUsers,
    approveUser,
} from "../services/userService";

function AdminDashboard() {

    const [stats, setStats] = useState({

        employees: 0,

        services: 0,

        appointments: 0,

        pendingUsers: 0,

    });

    const [users, setUsers] = useState([]);

    async function loadDashboard() {

        try {

            const dashboardData =
                await getDashboardData();

            setStats(dashboardData);

            const pending =
                await getPendingUsers();

            setUsers(pending);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleApprove(id) {

        try {

            await approveUser(id);

            loadDashboard();

        } catch (error) {

            console.error(error);

        }

    }

        useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();

    }, []);

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    HairFlow Admin Dashboard

                </h2>

                <div className="row mb-5">

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h5>Employees</h5>

                                <h2>{stats.employees}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h5>Services</h5>

                                <h2>{stats.services}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h5>Appointments</h5>

                                <h2>{stats.appointments}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center border-warning">

                            <div className="card-body">

                                <h5>Pending Users</h5>

                                <h2>{stats.pendingUsers}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                <h3 className="mb-3">

                    Pending User Approvals

                </h3>

                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >

                                    No pending users.

                                </td>

                            </tr>

                        ) : (

                            users.map((user) => (

                                <tr key={user.id}>

                                    <td>

                                        {user.first_name} {user.last_name}

                                    </td>

                                    <td>

                                        {user.email}

                                    </td>

                                    <td>

                                        {user.role}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                handleApprove(user.id)
                                            }
                                        >

                                            Approve

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminDashboard;