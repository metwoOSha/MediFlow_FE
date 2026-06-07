'use client';

import SpecializationsCard from '@/components/SpecializationsCard/SpecializationsCard';
import cls from './SpecializationsList.module.css';
import type { Specialization } from '@/types/specializations.types';

interface SpecializationsListProps {
    data: Specialization[];
}

export default function SpecializationsList({ data }: SpecializationsListProps) {
    return (
        <div className={cls.specGrid}>
            {data.map(({ id, specialization_name, doctors_count, icon_id, color_id }) => (
                <SpecializationsCard
                    key={id}
                    name={specialization_name}
                    count={doctors_count}
                    icon_id={icon_id}
                    color_id={color_id}
                />
            ))}
        </div>
    );
}
