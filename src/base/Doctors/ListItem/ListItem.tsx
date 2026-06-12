'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import cls from './ListItem.module.css';
import Phone from '@/components/Phone/Phone';
import Buttons from '@/components/Buttons/Buttons';
import Badge from '@/components/Badge/Badge';
import type { Doctor } from '@/types/doctors.types';

const WEEK_DAYS = [
    { id: 1, day: 'M' },
    { id: 2, day: 'T' },
    { id: 3, day: 'W' },
    { id: 4, day: 'T' },
    { id: 5, day: 'F' },
    { id: 6, day: 'S' },
    { id: 7, day: 'S' },
];

export interface ListItemProps extends Doctor {
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
    onSchedule?: (id: string) => void;
}

export default function ListItem({
    id,
    name,
    surname,
    specialization_name,
    category,
    phone,
    time_start,
    time_end,
    day_of_week,
    onDelete,
    onEdit,
    onSchedule,
}: ListItemProps) {
    return (
        <tr className={cls.tr}>
            <td>
                <div className={cls.person}>
                    <Avatar name={name} />
                    <div className={cls.col}>
                        <span className={cls.name}>
                            {name} {surname}
                        </span>
                    </div>
                </div>
            </td>
            <td>{specialization_name}</td>
            <td>
                <Badge variant="category" text={category} />
            </td>
            <td>{phone ? <Phone phone={phone} /> : '-'}</td>
            <td>
                <div className={cls.col}>
                    <div className={cls.scheduleChips}>
                        {WEEK_DAYS.map(({ id, day }) => (
                            <div key={id} className={`${cls.dayChip} ${day_of_week?.includes(id) ? cls.on : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <span className={cls.time}>
                        {time_start && time_end ? `${time_start.slice(0, 5)} - ${time_end.slice(0, 5)}` : '—'}
                    </span>
                </div>
            </td>
            <td style={{ textAlign: 'right' }}>
                <div className={cls.rowActions}>
                    <Buttons variant="row" action="edit" title="Edit" onClick={() => onEdit?.(id)} />
                    <Buttons variant="row" action="schedule" title="Schedule" onClick={() => onSchedule?.(id)} />
                    <Buttons variant="row" action="delete" title="Delete" onClick={() => onDelete?.(id)} />
                </div>
            </td>
        </tr>
    );
}
