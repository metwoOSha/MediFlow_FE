'use client';

import { DeleteIcon } from '../Icons/Buttons/DeleteIcon';
import { EditIcon } from '../Icons/Buttons/EditIcon';
import { PlusIcon } from '../Icons/Buttons/PlusIcon';
import { ScheduleIcon } from '../Icons/Buttons/ScheduleIcon';
import cls from './Buttons.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'icon' | 'primary' | 'row';
    action?: 'edit' | 'delete' | 'schedule';
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
                ) : null)}
        </button>
    );
}
