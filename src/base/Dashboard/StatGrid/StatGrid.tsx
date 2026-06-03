import StatisticsCard from '@/components/StatisticsCard/StatisticsCard';
import cls from './StatGrid.module.css';

export default function StatGrid() {
    return (
        <div className={cls.statGrid}>
            <StatisticsCard label="Appointments today" value={103} />
            <StatisticsCard label="Awaiting confirmation" value={30} />
            <StatisticsCard label="Checked in" value={14} />
            <StatisticsCard label="Cancelled / no-show" value={5} />
        </div>
    );
}
