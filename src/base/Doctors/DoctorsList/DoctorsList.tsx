'use client';

import { useCallback, useMemo } from 'react';
import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';
import type { Doctors } from '@/types/doctors.types';
import { useDoctorActions } from '@/hooks/useDoctorActions';
import Portal from '@/utils/Portal/Portal';
import DeleteModal from '@/components/Modal/DeleteModal/DeleteModal';
import EditDoctor from '@/components/Modal/EditDoctor/EditDoctor';
import ScheduleModal from '@/components/Modal/ScheduleModal/ScheduleModal';
import { APPOINTMENTS_LIST } from '@/base/Appointments/AppointmentsList/AppointmentsList';
import { Avatar } from '@/components/Avatar/Avatar';

const columns = [
    { id: 1, title: 'Doctor', width: '23%' },
    { id: 2, title: 'Specialization', width: '15%' },
    { id: 3, title: 'Category', width: '11%' },
    { id: 4, title: 'Phone', width: '18%' },
    { id: 5, title: 'Schedule', width: '21%' },
    { id: 6, title: 'Actions', width: '12%', align: 'right' as const },
];

export default function DoctorsList({ data }: { data: Doctors }) {
    const { editModal, scheduleModal, deleteModal, handleDelete, handleEdit } = useDoctorActions();
    const { open: openDelete } = deleteModal;
    const { open: openEdit } = editModal;
    const { open: openSchedule } = scheduleModal;

    const handleDeleteOpen = useCallback(
        (id: string) => {
            const doctor = data.doctors.find((d) => d.id === id);
            if (doctor) openDelete(doctor);
        },
        [data.doctors, openDelete],
    );

    const handleEditOpen = useCallback(
        (id: string) => {
            const doctor = data.doctors.find((d) => d.id === id);
            if (doctor) openEdit(doctor);
        },
        [data.doctors, openEdit],
    );

    const handleScheduleOpen = useCallback(
        (id: string) => {
            const doctor = data.doctors.find((d) => d.id === id);
            if (doctor) openSchedule(doctor);
        },
        [data.doctors, openSchedule],
    );

    const rows = useMemo(
        () =>
            data.doctors.map((d) => ({
                ...d,
                onDelete: handleDeleteOpen,
                onEdit: handleEditOpen,
                onSchedule: handleScheduleOpen,
            })),
        [data.doctors, handleDeleteOpen, handleEditOpen, handleScheduleOpen],
    );

    return (
        <>
            <Table columns={columns} data={rows} ListItem={ListItem} />
            {editModal.isOpen && editModal.data && (
                <Portal onClose={editModal.close}>
                    <EditDoctor
                        doctor={editModal.data}
                        onClose={editModal.close}
                        onSave={(body) => handleEdit(editModal.data!.id, body)}
                    />
                </Portal>
            )}
            {scheduleModal.isOpen && scheduleModal.data && (
                <Portal onClose={scheduleModal.close}>
                    <ScheduleModal
                        doctor={scheduleModal.data}
                        onClose={scheduleModal.close}
                        visits={APPOINTMENTS_LIST.filter(
                            (a) => a.doctor === `Dr. ${scheduleModal.data!.name} ${scheduleModal.data!.surname}`,
                        ).map((a) => ({
                            id: String(a.id),
                            patientName: a.name,
                            date: a.date,
                            time: a.time,
                            status: a.status as 'Confirmed' | 'Pending' | 'Cancelled',
                        }))}
                    />
                </Portal>
            )}
            {deleteModal.isOpen && deleteModal.data && (
                <Portal onClose={deleteModal.close}>
                    <DeleteModal
                        title="Doctor"
                        name={`Dr. ${deleteModal.data.name} ${deleteModal.data.surname}`}
                        onClose={deleteModal.close}
                        onConfirm={() => handleDelete(deleteModal.data!.id)}
                    >
                        <Avatar name={deleteModal.data.name} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>
                                {deleteModal.data.name} {deleteModal.data.surname}
                            </span>
                            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
                                {deleteModal.data.specialization_name}
                            </span>
                        </div>
                    </DeleteModal>
                </Portal>
            )}
        </>
    );
}
