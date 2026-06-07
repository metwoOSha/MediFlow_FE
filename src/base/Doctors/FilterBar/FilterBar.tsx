'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Buttons from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Portal from '@/utils/Portal/Portal';
import NewDoctor from '@/components/Modal/NewDoctor/NewDoctor';
import { CATEGORY_ITEMS, SPECIALIZATION_ITEMS } from '@/config/Select.config';
import { useDoctorActions } from '@/hooks/useDoctorActions';
import type { Specialization } from '@/types/specializations.types';

interface FilterBarProps {
    specializations: Specialization[];
}

export default function FilterBar({ specializations }: FilterBarProps) {
    const { createModal, handleCreate } = useDoctorActions();
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    return (
        <>
            <Input placeholder="Search doctors by name…" />
            <Select
                title="All specializations"
                items={SPECIALIZATION_ITEMS}
                onChange={(value) => updateParams('specialization', value)}
            />
            <Select
                title="All categories"
                items={CATEGORY_ITEMS}
                onChange={(value) => updateParams('category', value)}
            />
            <div style={{ flex: 1 }}></div>
            <Buttons variant="primary" text="Add doctor" onClick={() => createModal.open(true)} />

            {createModal.isOpen && (
                <Portal onClose={createModal.close}>
                    <NewDoctor specializations={specializations} onClose={createModal.close} onSave={handleCreate} />
                </Portal>
            )}
        </>
    );
}
