import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getPendingUsers,
    approveUser,
} from "../services/userService";

function AdminDashboard() {

    const [users, setUsers] = useState([]);

    async function loadUsers() {

        try {

            const data = await getPendingUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleApprove(id) {

        try {

            await approveUser(id);

            loadUsers();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>
                    Pending Users
                </h2>

                <table className="table table-striped mt-4">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

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

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminDashboard;