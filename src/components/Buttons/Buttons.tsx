'use client';

import { DeleteIcon } from '../Icons/Buttons/DeleteIcon';
import { EditIcon } from '../Icons/Buttons/EditIcon';
import { ManageIcon } from '../Icons/Buttons/ManageIcon';
import { PlusIcon } from '../Icons/Buttons/PlusIcon';
import { ScheduleIcon } from '../Icons/Buttons/ScheduleIcon';
import { EyeIcon } from '../Icons/Specializations/EyeIcon';
import cls from './Buttons.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'icon' | 'primary' | 'row' | 'manage' | 'ghost';
    action?: 'edit' | 'delete' | 'schedule' | 'view';
    icon?: React.ReactElement;
    className?: string;
    text?: string;
}

export default function Buttons({ variant = 'icon', icon, className, text, action, ...props }: ButtonProps) {
    return (
        <button
            className={`${cls[variant]} ${
                action === 'edit' ? cls.blue : action === 'delete' ? cls.danger : action === 'schedule' ? cls.cyan : ''
            } ${className || ''}`}
            {...props}
        >
            {icon}
            {variant === 'primary' && (
                <>
                    <PlusIcon />
                    <span>{text}</span>
                </>
            )}
            {variant === 'row' &&
                (action === 'edit' ? (
                    <EditIcon />
                ) : action === 'delete' ? (
                    <DeleteIcon />
                ) : action === 'schedule' ? (
                    <ScheduleIcon />
                ) : action === 'view' ? (
                    <EyeIcon width={16} height={16} />
                ) : null)}
            {variant === 'manage' && (
                <>
                    <ManageIcon />
                    <span>Manage</span>
                </>
            )}

            {variant === 'ghost' && (
                <>
                    <>
                        <span>{text}</span>
                    </>
                </>
            )}
        </button>
    );
}
