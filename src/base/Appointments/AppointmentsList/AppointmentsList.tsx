'use client';

import { useState } from 'react';
import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';
import Portal from '@/utils/Portal/Portal';
import ManageAppointment from '@/components/Modal/ManageAppointment/ManageAppointment';
import { useModal } from '@/hooks/useModal';
import { updateAppointmentStatus } from '@/api/Appointments';
import type { Appointment } from '@/types/appointments.types';

const columns = [
    { id: 1, title: 'Patient', width: '23%' },
    { id: 2, title: 'Doctor', width: '23%' },
    { id: 3, title: 'Date', width: '14%' },
    { id: 4, title: 'Time', width: '12%' },
    { id: 5, title: 'Status', width: '13%' },
    { id: 6, title: 'Actions', width: '14%', align: 'right' as const },
];

// Kept for DoctorsList schedule modal and ChipTabs fallback
export const APPOINTMENTS_LIST: Appointment[] = [
    {
        id: 1,
        name: 'Olivia Chen',
        doctor: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        date: 'May 27, 2026',
        time: '09:30',
        status: 'Confirmed',
    },
    {
        id: 2,
        name: 'Marcus Johnson',
        doctor: 'Dr. Priya Raman',
        spec: 'Pediatrics',
        date: 'May 27, 2026',
        time: '10:15',
        status: 'Pending',
    },
    {
        id: 3,
        name: 'Sofia Lindqvist',
        doctor: 'Dr. Hana Suzuki',
        spec: 'Dermatology',
        date: 'May 27, 2026',
        time: '11:00',
        status: 'Confirmed',
    },
    {
        id: 4,
        name: 'Diego Ramirez',
        doctor: 'Dr. Lucas Bennett',
        spec: 'Ophthalmology',
        date: 'May 27, 2026',
        time: '11:45',
        status: 'Cancelled',
    },
    {
        id: 5,
        name: 'Yuki Tanaka',
        doctor: 'Dr. Daniel Okafor',
        spec: 'Neurology',
        date: 'May 27, 2026',
        time: '13:00',
        status: 'Confirmed',
    },
    {
        id: 6,
        name: 'Amara Okonkwo',
        doctor: 'Dr. Marco Vitelli',
        spec: 'Orthopedics',
        date: 'May 27, 2026',
        time: '13:45',
        status: 'Pending',
    },
    {
        id: 7,
        name: 'Henrik Solberg',
        doctor: 'Dr. Elena Brașov',
        spec: 'Dentistry',
        date: 'May 27, 2026',
        time: '14:30',
        status: 'Confirmed',
    },
    {
        id: 8,
        name: 'Mei Lin',
        doctor: 'Dr. Ibrahim Sayed',
        spec: 'Internal Medicine',
        date: 'May 27, 2026',
        time: '15:15',
        status: 'Confirmed',
    },
];

interface AppointmentsListProps {
    data: Appointment[];
    filter?: string;
}

export default function AppointmentsList({ data, filter = 'All' }: AppointmentsListProps) {
    const manageModal = useModal<Appointment>();
    const [appointments, setAppointments] = useState<Appointment[]>(data);

    // filter применяется поверх локального состояния (оптимистичные обновления статусов)
    const visible = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter);

    const handleSave = async (status: string) => {
        if (!manageModal.data) return;
        const id = manageModal.data.id;
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
        manageModal.close();
        await updateAppointmentStatus(id, status);
    };

    const rows = visible.map((a) => ({
        ...a,
        onManage: () => manageModal.open(a),
    }));

    return (
        <>
            {visible.length === 0 ? (
                <p
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-3)',
                        fontSize: 13.5,
                        margin: 0,
                    }}
                >
                    {filter === 'All' ? 'No appointments for this date' : `No ${filter.toLowerCase()} appointments`}
                </p>
            ) : (
                <Table columns={columns} data={rows} ListItem={ListItem} />
            )}

            {manageModal.isOpen && manageModal.data && (
                <Portal onClose={manageModal.close}>
                    <ManageAppointment appointment={manageModal.data} onClose={manageModal.close} onSave={handleSave} />
                </Portal>
            )}
        </>
    );
}
