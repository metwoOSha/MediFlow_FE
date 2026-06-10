import { getAppointments } from '@/api/Appointments';
import DashGrid from '../DashGrid/DashGrid';
import StatGrid from '../StatGrid/StatGrid';
import cls from './DashboardIndex.module.css';

function todayISO() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export default async function DashboardIndex() {
    const { appointments } = await getAppointments({ date: todayISO() }).catch(() => ({ appointments: [], total: 0 }));

    const counts = {
        total: appointments.length,
        pending: appointments.filter((a) => a.status === 'Pending').length,
        checkedIn: appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Completed').length,
        cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
    };

    return (
        <div className={cls.pageDash}>
            <StatGrid counts={counts} />
            <DashGrid appointments={appointments} />
        </div>
    );
}
