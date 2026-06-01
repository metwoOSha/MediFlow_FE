import { getInitials } from '@/helpers/GetInitial';
import { getAvatarGradient } from '@/helpers/GetAvatarGradient';
import cls from './Avatar.module.css';

interface AvatarProps {
    size?: 'sm';
    name: string;
}

export function Avatar({ size = 'sm', name }: AvatarProps) {
    return (
        <div className={`${cls.avatar} ${cls[size]}`} style={{ background: getAvatarGradient(name) }}>
            {getInitials(name)}
        </div>
    );
}
