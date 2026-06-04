'use client';

import { useState } from 'react';
import cls from './WorkDay.module.css';

const DAYS = [
    { id: 1, day: 'Mo', active: true },
    { id: 2, day: 'Tu', active: true },
    { id: 3, day: 'We', active: true },
    { id: 4, day: 'Th', active: true },
    { id: 5, day: 'Fr', active: true },
    { id: 6, day: 'Sa', active: false },
    { id: 7, day: 'Su', active: false },
];

export default function WorkDay() {
    const [days, setDays] = useState(DAYS);

    function toggleDay(id: number) {
        setDays((prev) => prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)));
    }

    return (
        <div className={cls.days}>
            {days.map(({ id, day, active }) => (
                <button
                    key={id}
                    type="button"
                    className={`${cls.day} ${active ? cls.on : ''}`}
                    onClick={() => toggleDay(id)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}
