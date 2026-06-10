'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { AppointmentCounts } from '@/types/appointments.types';
import cls from './ChipTabs.module.css';

const CHIP_TABS = [
    { id: 1, title: 'All', color: null },
    { id: 2, title: 'Pending', color: 'var(--amber)' },
    { id: 3, title: 'Confirmed', color: 'var(--green)' },
    { id: 4, title: 'Completed', color: 'var(--blue)' },
    { id: 5, title: 'Cancelled', color: 'var(--red)' },
];

export default function ChipTabs({ counts }: { counts: AppointmentCounts }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const active = searchParams.get('status') ?? 'All';

    const handleClick = (title: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (title === 'All') {
            params.delete('status');
        } else {
            params.set('status', title);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={cls.chipTabs}>
            {CHIP_TABS.map(({ id, title, color }) => (
                <span
                    key={id}
                    className={`${cls.chipTab} ${active === title ? cls.active : ''}`}
                    onClick={() => handleClick(title)}
                >
                    {color && (
                        <span
                            className={`${cls.dot} ${active === title ? cls.dotActive : ''}`}
                            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                        />
                    )}
                    {title}
                    <span className={`${cls.count} ${active === title ? cls.countActive : ''}`}>
                        {counts[title as keyof AppointmentCounts]}
                    </span>
                </span>
            ))}
        </div>
    );
}
