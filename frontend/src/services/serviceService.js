import api from "./api";

export async function getServices() {

    const response = await api.get("/services");

    return response.data;

}

export async function createService(service) {

    const response = await api.post(
        "/services",
        service
    );

    return response.data;

}

export async function updateService(serviceId, service) {

    const response = await api.put(
        `/services/${serviceId}`,
        service
    );

    return response.data;

}

export async function deleteService(serviceId) {

    await api.delete(
        `/services/${serviceId}`
    );

}