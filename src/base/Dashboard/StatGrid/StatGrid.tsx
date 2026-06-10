import StatisticsCard from '@/components/StatisticsCard/StatisticsCard';
import cls from './StatGrid.module.css';

interface StatGridProps {
    counts: {
        total: number;
        pending: number;
        checkedIn: number;
        cancelled: number;
    };
}

export default function StatGrid({ counts }: StatGridProps) {
    return (
        <div className={cls.statGrid}>
            <StatisticsCard label="Appointments today" value={counts.total} />
            <StatisticsCard label="Awaiting confirmation" value={counts.pending} />
            <StatisticsCard label="Checked in" value={counts.checkedIn} />
            <StatisticsCard label="Cancelled / no-show" value={counts.cancelled} />
        </div>
    );
}
