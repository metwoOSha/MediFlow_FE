import { getDoctors } from '@/api/Doctors';
import { getPatients } from '@/api/Patients';
import { getAppointments } from '@/api/Appointments';
import FilterBar from '@/base/Appointments/FilterBar/FilterBar';
import AppointmentsList from '@/base/Appointments/AppointmentsList/AppointmentsList';
import MainLayout from '@/layout/MainLayout/MainLayout';

function todayISO() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export default async function AppointmentsPage({
    searchParams,
}: {
    searchParams: Promise<{ date?: string; status?: string }>;
}) {
    const { date, status } = await searchParams;
    const selectedDate = date ?? todayISO();

    const [{ doctors }, { patients }, appointmentsRes] = await Promise.all([
        getDoctors({ limit: 999 }),
        getPatients(1, 999),
        getAppointments({ date: selectedDate }).catch(() => ({ appointments: [], total: 0 })),
    ]);

    const appointments = appointmentsRes.appointments ?? [];

    const counts = {
        All: appointments.length,
        Pending: appointments.filter((a) => a.status === 'Pending').length,
        Confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
        Completed: appointments.filter((a) => a.status === 'Completed').length,
        Cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
    };

    return (
        <MainLayout FilterBar={<FilterBar doctors={doctors} patients={patients} counts={counts} />}>
            <AppointmentsList
                key={`${selectedDate}-${appointments.length}`}
                data={appointments}
                filter={status ?? 'All'}
            />
        </MainLayout>
    );
}
