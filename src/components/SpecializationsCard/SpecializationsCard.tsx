'use client';

import { getSpecIcon } from '@/helpers/GetSpecIcon';
import { getSpecGradient } from '@/helpers/GetSpecGradient';
import cls from './SpecializationsCard.module.css';
import Buttons from '../Buttons/Buttons';

interface SpecializationsCardProps {
    spec: string;
    count: number;
}

export default function SpecializationsCard({ spec, count }: SpecializationsCardProps) {
    const { sp1, sp2 } = getSpecGradient(spec);
    return (
        <div className={cls.specCard} style={{ '--sp-1': sp1, '--sp-2': sp2 } as React.CSSProperties}>
            <div className={cls.specIcon}>{getSpecIcon(spec)}</div>
            <div className={cls.specInfo}>
                <span className={cls.specName}>{spec}</span>
                <span className={cls.specCount}>{`${count} doctors`}</span>
            </div>
            <div className={cls.specActions}>
                <Buttons variant="row" action="edit" />
                <Buttons variant="row" action="delete" />
            </div>
        </div>
    );
}
