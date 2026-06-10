'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import Badge from '@/components/Badge/Badge';
import Buttons from '@/components/Buttons/Buttons';
import type { Appointment } from '@/types/appointments.types';
import cls from './ListItem.module.css';

interface ListItemProps extends Appointment {
    onManage: () => void;
}

export default function ListItem({ name, doctor, spec, date, time, status, onManage }: ListItemProps) {
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
                <Buttons variant="manage" onClick={onManage} />
            </td>
        </tr>
    );
}
