import { getInitials } from '@/helpers/GetInitial';
import { getAvatarGradient } from '@/helpers/GetAvatarGradient';
import cls from './Avatar.module.css';

interface AvatarProps {
    size?: 'sm' | 'md';
    name: string;
}

export function Avatar({ size = 'sm', name }: AvatarProps) {
    return (
        <div className={`${cls.avatar} ${size === 'sm' ? cls.sm : ''}`} style={{ background: getAvatarGradient(name) }}>
            {getInitials(name)}
        </div>
    );
}
