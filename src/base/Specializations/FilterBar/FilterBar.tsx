'use client';

import Buttons from '@/components/Buttons/Buttons';
import Portal from '@/utils/Portal/Portal';
import NewSpecialization from '@/components/Modal/NewSpecialization/NewSpecialization';
import { useSpecializationActions } from '@/hooks/useSpecializationActions';
import cls from './FilterBar.module.css';

export default function FilterBar() {
    const { createModal, handleCreate } = useSpecializationActions();

    return (
        <>
            <div className={cls.filterInfo}>
                <div className={cls.filterTitle}>9 specializations</div>
                <div className={cls.filterSubTitle}>Manage the medical fields offered at your clinic.</div>
            </div>
            <div className={cls.spacer}></div>
            <Buttons text="Add specialization" variant="primary" onClick={() => createModal.open(true)} />

            {createModal.isOpen && (
                <Portal onClose={createModal.close}>
                    <NewSpecialization onClose={createModal.close} onSave={handleCreate} />
                </Portal>
            )}
        </>
    );
}
