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

export default function Badge({ text }: BadgeProps) {
    return <span className={`${cls.badge} ${text && cls[CATEGORY_CLASS[text] ?? '']}`}>{text}</span>;
}
