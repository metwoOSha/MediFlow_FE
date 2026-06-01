'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import cls from './ListItem.module.css';
import Phone from '@/components/Phone/Phone';
import Buttons from '@/components/Buttons/Buttons';
import Badge from '@/components/Badge/Badge';

const SCHEDULE = [
    { id: 1, day: 'M' },
    { id: 2, day: 'T' },
    { id: 3, day: 'W' },
    { id: 4, day: 'T' },
    { id: 5, day: 'F' },
    { id: 6, day: 'S' },
    { id: 7, day: 'S' },
];

interface ListItemProps {
    name: string;
    spec: string;
    category: string;
    phone?: string;
    time_start: string;
    time_end: string;
}

export default function ListItem({ name, spec, category, phone, time_start, time_end }: ListItemProps) {
    return (
        <tr className={cls.tr}>
            <td>
                <div className={cls.person}>
                    <Avatar name={name} />
                    <div className={cls.col}>
                        <span className={cls.name}>{name}</span>
                    </div>
                </div>
            </td>
            <td>{spec}</td>
            <td>
                <Badge text={category} />
            </td>
            <td>{phone ? <Phone phone={phone} /> : '-'}</td>
            <td>
                <div className={cls.col}>
                    <div className={cls.scheduleChips}>
                        {SCHEDULE.map(({ id, day }) => (
                            <div key={id} className={`${cls.dayChip} ${cls.on}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <span className={cls.time}>{`${time_start} - ${time_end}`}</span>
                </div>
            </td>
            <td style={{ textAlign: 'right' }}>
                <div className={cls.rowActions}>
                    <Buttons variant="row" action="edit" title="Edit" />
                    <Buttons variant="row" action="schedule" title="Schedule" />
                    <Buttons variant="row" action="delete" title="Delete" />
                </div>
            </td>
        </tr>
    );
}
