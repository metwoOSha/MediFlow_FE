import DashGrid from '../DashGrid/DashGrid';
import StatGrid from '../StatGrid/StatGrid';
import cls from './DashboardIndex.module.css';

export default function DashboardIndex() {
    return (
        <div className={cls.pageDash}>
            <StatGrid />
            <DashGrid />
        </div>
    );
}
