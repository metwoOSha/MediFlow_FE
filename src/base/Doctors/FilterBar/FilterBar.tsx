'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';
import Buttons from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import { CATEGORY_ITEMS, SPECIALIZATION_ITEMS } from '@/config/Select.config';
import ModalLayout from '@/layout/ModalLayout/ModalLayout';
import NewDoctor from '@/components/Modal/NewDoctor/NewDoctor';

export default function FilterBar() {
    const [isOpen, setIsOpen] = useState(false);
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
            <Buttons variant="primary" text="Add doctor" onClick={() => setIsOpen(true)} />

            {isOpen &&
                createPortal(
                    <ModalLayout
                        subtitle="Doctors"
                        title="New Doctor"
                        btnText="Add doctor"
                        onClose={() => setIsOpen(false)}
                    >
                        <NewDoctor />
                    </ModalLayout>,
                    document.body,
                )}
        </>
    );
}
