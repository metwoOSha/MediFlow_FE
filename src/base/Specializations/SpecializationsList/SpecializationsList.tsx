'use client';

import SpecializationsCard from '@/components/SpecializationsCard/SpecializationsCard';
import cls from './SpecializationsList.module.css';

export const SPECIALIZATIONS = [
    { id: 1, spec: 'Cardiology', count: 12 },
    { id: 2, spec: 'Neurology', count: 9 },
    { id: 3, spec: 'Pediatrics', count: 14 },
    { id: 4, spec: 'Orthopedics', count: 8 },
    { id: 5, spec: 'Dermatology', count: 6 },
    { id: 6, spec: 'Ophthalmology', count: 5 },
    { id: 7, spec: 'Dentistry', count: 7 },
    { id: 8, spec: 'Internal Medicine', count: 11 },
    { id: 9, spec: 'Pharmacology', count: 4 },
];

export default function SpecializationsList() {
    return (
        <div className={cls.specGrid}>
            {SPECIALIZATIONS.map(({ id, spec, count }) => (
                <SpecializationsCard key={id} spec={spec} count={count} />
            ))}
        </div>
    );
}
