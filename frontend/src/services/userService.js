import api from "./api";

export async function getPendingUsers() {

    const response = await api.get("/users/pending");

    return response.data;

}

export async function approveUser(userId) {

    const response = await api.put(
        `/users/${userId}/approve`
    );

    return response.data;

}