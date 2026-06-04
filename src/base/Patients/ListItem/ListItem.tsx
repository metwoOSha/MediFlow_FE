'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import Phone from '@/components/Phone/Phone';
import Buttons from '@/components/Buttons/Buttons';
import cls from './ListItem.module.css';

interface ListItemProps {
    id: number;
    name: string;
    email: string;
    phone?: string;
    appointments: number;
    registered: string;
    next_visit?: string | null;
}

export default function ListItem({ name, email, phone, appointments, registered, next_visit }: ListItemProps) {
    return (
        <tr className={cls.tr}>
            <td>
                <div className={cls.person}>
                    <Avatar name={name} />
                    <div className={cls.col}>
                        <span className={cls.name}>{name}</span>
                        <span className={cls.muted}>{email}</span>
                    </div>
                </div>
            </td>
            <td>{phone ? <Phone phone={phone} /> : '—'}</td>
            <td>
                <span className={cls.countBadge}>{appointments} total</span>
            </td>
            <td>{registered}</td>
            <td>
                {next_visit ? (
                    <span className={cls.nextVisit}>
                        <span className={cls.dot} />
                        {next_visit}
                    </span>
                ) : (
                    <span className={cls.muted}>—</span>
                )}
            </td>
            <td style={{ textAlign: 'right' }}>
                <div className={cls.rowActions}>
                    <Buttons variant="row" action="view" title="View" />
                    <Buttons variant="row" action="edit" title="Edit" />
                    <Buttons variant="row" action="delete" title="Delete" />
                </div>
            </td>
        </tr>
    );
}
