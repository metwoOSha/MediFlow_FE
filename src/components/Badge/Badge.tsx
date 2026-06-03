import { TimeIcon } from '../Icons/TimeIcon';
import cls from './Badge.module.css';

interface BadgeProps {
    variant?: 'category' | 'status' | 'time';
    text?: string;
}

const CATEGORY_CLASS: Record<string, string> = {
    Highest: 'purple',
    First: 'blue',
    Second: 'green',
};

const STATUS_CLASS: Record<string, string> = {
    Confirmed: 'green',
    Pending: 'amber',
    Cancelled: 'red',
};

export default function Badge({ text, variant }: BadgeProps) {
    return (
        <span
            className={`${cls.badge} 
			${variant === 'time' && cls.time} 
			${variant === 'category' && text && cls[CATEGORY_CLASS[text] ?? '']} 
			${variant === 'status' && text && cls[STATUS_CLASS[text] ?? '']}`}
        >
            {variant === 'time' && <TimeIcon />}
            {text}
        </span>
    );
}
