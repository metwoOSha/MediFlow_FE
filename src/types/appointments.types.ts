export interface Appointment {
    id: number;
    name: string;
    doctor: string;
    spec: string;
    date: string;
    time: string;
    status: string;
}

export interface AppointmentCounts {
    All: number;
    Pending: number;
    Confirmed: number;
    Completed: number;
    Cancelled: number;
}

export interface AppointmentsResponse {
    appointments: Appointment[];
    total: number;
}
