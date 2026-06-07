'use client';

import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Buttons from '@/components/Buttons/Buttons';
import Portal from '@/utils/Portal/Portal';
import NewPatient from '@/components/Modal/NewPatient/NewPatient';
import { usePatientActions } from '@/hooks/usePatientActions';
import cls from './FilterBar.module.css';

export default function FilterBar() {
    const { createModal, handleCreate } = usePatientActions();

    return (
        <>
            <Input placeholder="Search by name or email…" />
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
