import { getInitials } from '@/helpers/GetInitial';
import cls from './AdminChip.module.css';
import { Avatar } from '../Avatar/Avatar';

interface AdminChipProps {
    name: string;
    role: string;
}

export default function AdminChip({ name, role }: AdminChipProps) {
    return (
        <div className={cls.adminChip}>
            <Avatar name={name} />
            <div className={cls.meta}>
                <span className={cls.name}>{name}</span>
                <span className={cls.role}>{role}</span>
            </div>
        </div>
    );
}
