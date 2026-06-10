'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarIcon } from '../Icons/Calendar/CalendarIcon';
import { DeleteIcon } from '../Icons/Calendar/DeleteIcon';
import { NextIcon } from '../Icons/Calendar/NextIcon';
import { PrevIcon } from '../Icons/Calendar/PrevIcon';
import cls from './Calendar.module.css';

const WEEK = [
    { id: 1, day: 'Mo' },
    { id: 2, day: 'Tu' },
    { id: 3, day: 'We' },
    { id: 4, day: 'Th' },
    { id: 5, day: 'Fr' },
    { id: 6, day: 'Sa' },
    { id: 7, day: 'Su' },
];

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

interface CalendarProps {
    onSelect?: (date: string) => void;
    fullWidth?: boolean;
}

export default function Calendar({ onSelect, fullWidth }: CalendarProps = {}) {
    const today = new Date();
    const [year, setYear] = useState<number>(today.getFullYear());
    const [month, setMonth] = useState<number>(today.getMonth());
    const [selected, setSelected] = useState<number | null>(today.getDate());
    const [open, setOpen] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    function getDays(year: number, month: number) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const cells: (number | null)[] = [];

        for (let i = 0; i < startOffset; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);

        return cells;
    }

    function prevMonth() {
        if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
        } else setMonth((m) => m - 1);
    }

    function nextMonth() {
        if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
        } else setMonth((m) => m + 1);
    }

    function fmt(y: number, m: number, d: number) {
        return `${MONTHS[m]} ${d}, ${y}`;
    }

    function goToday() {
        setYear(today.getFullYear());
        setMonth(today.getMonth());
        setSelected(today.getDate());
        onSelect?.(fmt(today.getFullYear(), today.getMonth(), today.getDate()));
    }

    function clearDate() {
        setSelected(today.getDate());
        setYear(today.getFullYear());
        setMonth(today.getMonth());
        onSelect?.(fmt(today.getFullYear(), today.getMonth(), today.getDate()));
    }

    const isToday = (day: number) =>
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const displayValue = selected ? `${MONTHS[month]} ${selected}, ${year}` : 'Select date';

    return (
        <div className={cls.calendar} ref={ref} style={fullWidth ? { width: '100%' } : undefined}>
            <button
                type="button"
                className={`${cls.button} ${open ? cls.buttonActive : ''}`}
                onClick={() => setOpen((p) => !p)}
            >
                <span className={cls.icon}>
                    <CalendarIcon />
                </span>
                <span className={`${cls.value} ${!selected ? cls.placeholder : ''}`}>{displayValue}</span>
                {selected && (
                    <span
                        className={cls.clear}
                        role="button"
                        aria-label="Clear date"
                        onClick={(e) => {
                            e.stopPropagation();
                            clearDate();
                        }}
                    >
                        <DeleteIcon />
                    </span>
                )}
            </button>

            {open && (
                <div className={cls.panel}>
                    <div className={cls.head}>
                        <button type="button" aria-label="Previous month" className={cls.navButton} onClick={prevMonth}>
                            <PrevIcon />
                        </button>
                        <div className={cls.title}>
                            {MONTHS[month]} {year}
                        </div>
                        <button type="button" aria-label="Next month" className={cls.navButton} onClick={nextMonth}>
                            <NextIcon />
                        </button>
                    </div>

                    <div className={cls.dow}>
                        {WEEK.map(({ id, day }) => (
                            <span key={id} className={cls.week}>
                                {day}
                            </span>
                        ))}
                    </div>

                    <div className={cls.grid}>
                        {getDays(year, month).map((day, i) =>
                            day === null ? (
                                <span key={i} className={cls.cell} />
                            ) : (
                                <button
                                    key={i}
                                    type="button"
                                    className={`${cls.cell} ${isToday(day) ? cls.today : ''} ${day === selected ? cls.sel : ''}`}
                                    onClick={() => {
                                        setSelected(day);
                                        setOpen(false);
                                        onSelect?.(fmt(year, month, day));
                                    }}
                                >
                                    {day}
                                </button>
                            ),
                        )}
                    </div>

                    <div className={cls.foot}>
                        <button type="button" className={cls.btnToday} onClick={goToday}>
                            Today
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
