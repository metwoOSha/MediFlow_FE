'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import Badge from '@/components/Badge/Badge';
import cls from './ListItem.module.css';
import Buttons from '@/components/Buttons/Buttons';

interface ListItemProps {
    id: number;
    name: string;
    doctor: string;
    spec: string;
    date: string;
    time: string;
    status: string;
}

export default function ListItem({ name, doctor, spec, date, time, status }: ListItemProps) {
    return (
        <tr className={cls.tr}>
            <td>
                <div className={cls.person}>
                    <Avatar name={name} />
                    <span className={cls.name}>{name}</span>
                </div>
            </td>
            <td>
                <div className={cls.col}>
                    <span className={cls.name}>{doctor}</span>
                    <span className={cls.muted}>{spec}</span>
                </div>
            </td>
            <td className={cls.date}>{date}</td>
            <td>
                <Badge variant="time" text={time} />
            </td>
            <td>
                <Badge variant="status" text={status} />
            </td>
            <td style={{ textAlign: 'right' }}>
                <Buttons variant="manage" />
            </td>
        </tr>
    );
}
