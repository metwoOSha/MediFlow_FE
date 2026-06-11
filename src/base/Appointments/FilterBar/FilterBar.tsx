'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ChipTabs from '@/components/ChipTabs/ChipTabs';
import Calendar from '@/components/Calendar/Calendar';
import Buttons from '@/components/Buttons/Buttons';
import Portal from '@/utils/Portal/Portal';
import NewAppointment from '@/components/Modal/NewAppointment/NewAppointment';
import { useModal } from '@/hooks/useModal';
import type { AppointmentCounts } from '@/types/appointments.types';
import { createAppointment, type CreateAppointmentData } from '@/api/Appointments';
import type { Doctor } from '@/types/doctors.types';
import type { Patient } from '@/types/patients.types';
import cls from './FilterBar.module.css';

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function calendarDateToISO(dateStr: string): string {
    // "June 10, 2026" → "2026-06-10"
    const parts = dateStr.split(' ');
    const month = String(MONTHS.indexOf(parts[0]) + 1).padStart(2, '0');
    const day = parts[1].replace(',', '').padStart(2, '0');
    return `${parts[2]}-${month}-${day}`;
}

interface FilterBarProps {
    doctors: Doctor[];
    patients: Patient[];
    counts: AppointmentCounts;
}

export default function FilterBar({ doctors, patients, counts }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const newModal = useModal<true>();

    const handleDateSelect = (dateStr: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('date', calendarDateToISO(dateStr));
        params.delete('status');
        router.push(`?${params.toString()}`);
    };

    const handleSave = async (data: CreateAppointmentData) => {
        await createAppointment(data);
        newModal.close();
        router.refresh();
    };

    return (
        <>
            <ChipTabs counts={counts} />
            <div className={cls.spacer} />
            <Calendar onSelect={handleDateSelect} />
            <Buttons variant="primary" text="New appointment" onClick={() => newModal.open(true)} />

            {newModal.isOpen && (
                <Portal onClose={newModal.close}>
                    <NewAppointment
                        doctors={doctors}
                        patients={patients}
                        onClose={newModal.close}
                        onSave={handleSave}
                    />
                </Portal>
            )}
        </>
    );
}
