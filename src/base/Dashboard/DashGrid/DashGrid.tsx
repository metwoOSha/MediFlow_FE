import Link from 'next/link';
import cls from './DashGrid.module.css';
import DashList from '../DashList/DashList';

export default function DashGrid() {
    return (
        <div className={cls.dashGrid}>
            <div className={cls.gridTable}>
                <div className={cls.cardHead}>
                    <div className={cls.col}>
                        <div className={cls.cardTitle}>Recent appointments</div>
                        <div className={cls.cardSub}>Today · 6 scheduled visits</div>
                    </div>
                    <Link href="/admin/appointments" className={cls.cardLink}>
                        View all →
                    </Link>
                </div>
                <div className={cls.tableBlock}>
                    <DashList />
                </div>
            </div>
        </div>
    );
}
