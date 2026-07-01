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

export async function getClients() {

    const response = await api.get("/users/clients");

    return response.data;

}