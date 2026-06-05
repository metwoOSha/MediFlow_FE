'use client';

import SpecializationsCard from '@/components/SpecializationsCard/SpecializationsCard';
import cls from './SpecializationsList.module.css';
import type { Specialization } from '@/types/specializations';

interface SpecializationsListProps {
    data: Specialization[];
}

export default function SpecializationsList({ data }: SpecializationsListProps) {
    console.log(data);
    return (
        <div className={cls.specGrid}>
            {data.map(({ id, specialization_name, doctors_count }) => (
                <SpecializationsCard key={id} spec={specialization_name} count={doctors_count} />
            ))}
        </div>
    );
}
