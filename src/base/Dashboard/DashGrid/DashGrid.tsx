import Link from 'next/link';
import cls from './DashGrid.module.css';
import DashList from '../DashList/DashList';
import type { Appointment } from '@/types/appointments.types';

interface DashGridProps {
    appointments: Appointment[];
}

export default function DashGrid({ appointments }: DashGridProps) {
    const count = appointments.length;

    return (
        <div className={cls.dashGrid}>
            <div className={cls.gridTable}>
                <div className={cls.cardHead}>
                    <div className={cls.col}>
                        <div className={cls.cardTitle}>Recent appointments</div>
                        <div className={cls.cardSub}>
                            Today · {count} scheduled {count === 1 ? 'visit' : 'visits'}
                        </div>
                    </div>
                    <Link href="/admin/appointments" className={cls.cardLink}>
                        View all →
                    </Link>
                </div>
                <div className={cls.tableBlock}>
                    <DashList data={appointments} />
                </div>
            </div>
        </div>
    );
}
