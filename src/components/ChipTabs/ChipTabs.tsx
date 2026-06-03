'use client';

import { useState } from 'react';
import cls from './ChipTabs.module.css';

const CHIP_TABS = [
    { id: 1, title: 'All', count: 12, color: null },
    { id: 2, title: 'Pending', count: 6, color: 'var(--amber)' },
    { id: 3, title: 'Confirmed', count: 4, color: 'var(--green)' },
    { id: 4, title: 'Cancelled', count: 2, color: 'var(--red)' },
];

export default function ChipTabs() {
    const [active, setActive] = useState<string>(CHIP_TABS[0].title);
    return (
        <div className={cls.chipTabs}>
            {CHIP_TABS.map(({ id, title, count, color }) => (
                <span
                    key={id}
                    className={`${cls.chipTab} ${active === title ? cls.active : ''}`}
                    onClick={() => setActive(title)}
                >
                    {color && (
                        <span
                            className={`${cls.dot} ${active === title ? cls.dotActive : ''}`}
                            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                        />
                    )}
                    {title}
                    <span className={`${cls.count} ${active === title ? cls.countActive : ''}`}>{count}</span>
                </span>
            ))}
        </div>
    );
}
