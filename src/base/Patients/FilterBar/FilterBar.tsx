'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Buttons from '@/components/Buttons/Buttons';
import Portal from '@/utils/Portal/Portal';
import NewPatient from '@/components/Modal/NewPatient/NewPatient';
import { usePatientActions } from '@/hooks/usePatientActions';
import cls from './FilterBar.module.css';

export default function FilterBar() {
    const { createModal, handleCreate } = usePatientActions();
    const router = useRouter();
    const searchParams = useSearchParams();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) {
                params.set('search', e.target.value);
            } else {
                params.delete('search');
            }
            params.set('page', '1');
            router.push(`?${params.toString()}`);
        }, 400);
    };

    return (
        <>
            <Input
                placeholder="Search by name or email…"
                defaultValue={searchParams.get('search') ?? ''}
                onChange={handleSearch}
            />
            <Select
                title="All patients"
                items={[
                    { id: 1, spec: 'With upcoming visit' },
                    { id: 2, spec: 'No upcoming visit' },
                ]}
            />
            <div className={cls.spacer}></div>
            <Buttons variant="primary" text="Add patient" onClick={() => createModal.open(true)} />

            {createModal.isOpen && (
                <Portal onClose={createModal.close}>
                    <NewPatient onClose={createModal.close} onSave={handleCreate} />
                </Portal>
            )}
        </>
    );
}
