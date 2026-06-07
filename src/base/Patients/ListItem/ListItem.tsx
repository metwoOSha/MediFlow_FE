'use client';

import { Avatar } from '@/components/Avatar/Avatar';
import Phone from '@/components/Phone/Phone';
import Buttons from '@/components/Buttons/Buttons';
import type { Patient } from '@/types/patients.types';
import cls from './ListItem.module.css';

interface ListItemProps extends Patient {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function ListItem({ name, surname, email, phone, created_at, onView, onEdit, onDelete }: ListItemProps) {
    const fullName = `${name} ${surname}`;

    return (
        <tr className={cls.tr}>
            <td>
                <div className={cls.person}>
                    <Avatar name={fullName} />
                    <div className={cls.col}>
                        <span className={cls.name}>{fullName}</span>
                        <span className={cls.muted}>{email}</span>
                    </div>
                </div>
            </td>
            <td>{phone ? <Phone phone={phone} /> : '—'}</td>
            <td>{formatDate(created_at)}</td>
            <td style={{ textAlign: 'right' }}>
                <div className={cls.rowActions}>
                    <Buttons variant="row" action="view" title="View" onClick={onView} />
                    <Buttons variant="row" action="edit" title="Edit" onClick={onEdit} />
                    <Buttons variant="row" action="delete" title="Delete" onClick={onDelete} />
                </div>
            </td>
        </tr>
    );
}
