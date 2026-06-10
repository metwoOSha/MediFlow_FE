import { get, patch } from './http';
import type { Appointment, AppointmentsResponse } from '@/types/appointments.types';

const APPOINTMENTS_URL = '/appointments';
const APPOINTMENT_URL = (id: number) => `/appointments/${id}/status`;

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function formatDate(iso: string): string {
    const d = new Date(iso);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

interface AppointmentRow {
    id: number;
    date: string;
    time: string;
    status: string;
    patient_name: string;
    patient_surname: string;
    doctor_name: string;
    doctor_surname: string;
    specialization_name: string;
}

function mapRow(row: AppointmentRow): Appointment {
    return {
        id: row.id,
        name: `${row.patient_name} ${row.patient_surname}`,
        doctor: `Dr. ${row.doctor_name} ${row.doctor_surname}`,
        spec: row.specialization_name,
        date: formatDate(row.date),
        time: row.time.slice(0, 5),
        status: capitalize(row.status),
    };
}

export async function getAppointments(params?: Record<string, string | number>): Promise<AppointmentsResponse> {
    const res = await get(APPOINTMENTS_URL, params);
    const rows: AppointmentRow[] = await res.json();
    const appointments = rows.map(mapRow);
    return { appointments, total: appointments.length };
}

export async function updateAppointmentStatus(id: number, status: string): Promise<void> {
    await patch(APPOINTMENT_URL(id), { status });
}
