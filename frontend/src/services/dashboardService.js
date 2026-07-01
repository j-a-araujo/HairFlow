import { getEmployees } from "./employeeService";
import { getServices } from "./serviceService";
import { getAppointments } from "./appointmentService";
import { getPendingUsers } from "./userService";

export async function getDashboardData() {

    const [
        employees,
        services,
        appointments,
        pendingUsers,
    ] = await Promise.all([

        getEmployees(),

        getServices(),

        getAppointments(),

        getPendingUsers(),

    ]);

    return {

        employees: employees.length,

        services: services.length,

        appointments: appointments.length,

        pendingUsers: pendingUsers.length,

    };

}