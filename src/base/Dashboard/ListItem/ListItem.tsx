import { Avatar } from '@/components/Avatar/Avatar';
import cls from './ListItem.module.css';
import Badge from '@/components/Badge/Badge';

interface ListItemProps {
    name: string;
}

export default function ListItem({ name }: ListItemProps) {
    return (
        <tr>
            <td>
                <div className={cls.person}>
                    <Avatar name={name} />
                    <div className={cls.col}>
                        <span className={cls.name}>{name}</span>
                    </div>
                </div>
            </td>
            <td>
                <div className={cls.col}>
                    <span style={{ fontWeight: '500' }}>Dr. Amelia Hart</span>
                    <span className={cls.muted}>Cardiology</span>
                </div>
            </td>
            <td>
                <Badge variant="time" text="09:30" />
            </td>
            <td>
                <Badge variant="status" text="Confirmed" />
            </td>
        </tr>
    );
}
