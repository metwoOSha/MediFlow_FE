'use client';

import { CARD_CONFIG } from '@/config/Card.config';
import cls from './StatisticsCard.module.css';

interface StatisticsCardProps {
    label: string;
    value: number;
}

export default function StatisticsCard({ label, value }: StatisticsCardProps) {
    const config = CARD_CONFIG[label];
    return (
        <div className={cls.stat} style={config.style}>
            <div className={cls.statRow}>
                <div className={cls.statIcon}>{config.icon}</div>
                <div className={cls.statBlock}>
                    <span className={cls.statLabel}>{label}</span>
                    <span className={cls.statValue}>{value}</span>
                </div>
            </div>
        </div>
    );
}
