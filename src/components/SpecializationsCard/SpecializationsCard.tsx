'use client';

import { SPEC_ICONS } from '@/config/Specializations.config';
import { SPEC_COLORS_LIST } from '@/config/Gradient.config';
import { DefaultIcon } from '@/components/Icons/Specializations/DefaultIcon';
import Buttons from '../Buttons/Buttons';
import cls from './SpecializationsCard.module.css';

const FALLBACK_COLORS = { sp1: '#8b5cf6', sp2: '#ec4899' };

interface SpecializationsCardProps {
    name: string;
    count: number;
    icon_id: number;
    color_id: number;
    onEdit: () => void;
    onDelete: () => void;
}

export default function SpecializationsCard({
    name,
    count,
    icon_id,
    color_id,
    onEdit,
    onDelete,
}: SpecializationsCardProps) {
    const { sp1, sp2 } = SPEC_COLORS_LIST.find((c) => c.id === color_id) ?? FALLBACK_COLORS;
    const icon = SPEC_ICONS.find((i) => i.id === icon_id)?.icon ?? <DefaultIcon />;
    return (
        <div className={cls.specCard} style={{ '--sp-1': sp1, '--sp-2': sp2 } as React.CSSProperties}>
            <div className={cls.specIcon}>{icon}</div>
            <div className={cls.specInfo}>
                <span className={cls.specName}>{name}</span>
                <span className={cls.specCount}>{`${count} doctors`}</span>
            </div>
            <div className={cls.specActions}>
                <Buttons variant="row" action="edit" onClick={onEdit} />
                <Buttons variant="row" action="delete" onClick={onDelete} />
            </div>
        </div>
    );
}
