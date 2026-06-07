'use client';

import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';
import Portal from '@/utils/Portal/Portal';
import ViewPatient from '@/components/Modal/ViewPatient/ViewPatient';
import EditPatient from '@/components/Modal/EditPatient/EditPatient';
import DeleteModal from '@/components/Modal/DeleteModal/DeleteModal';
import { Avatar } from '@/components/Avatar/Avatar';
import { usePatientActions } from '@/hooks/usePatientActions';
import type { Patient } from '@/types/patients.types';

const columns = [
    { id: 1, title: 'Patient', width: '32%' },
    { id: 2, title: 'Phone', width: '22%' },
    { id: 3, title: 'Registered', width: '22%' },
    { id: 4, title: 'Actions', width: '14%', align: 'right' as const },
];

interface PatientsListProps {
    patients: Patient[];
}

export default function PatientsList({ patients }: PatientsListProps) {
    const { viewModal, editModal, deleteModal, handleEdit, handleDelete } = usePatientActions();

    const rows = patients.map((p) => ({
        ...p,
        onView: () => viewModal.open(p),
        onEdit: () => editModal.open(p),
        onDelete: () => deleteModal.open(p),
    }));

    return (
        <>
            <Table columns={columns} data={rows} ListItem={ListItem} />

            {viewModal.isOpen && viewModal.data && (
                <Portal onClose={viewModal.close}>
                    <ViewPatient patient={viewModal.data} onClose={viewModal.close} />
                </Portal>
            )}

            {editModal.isOpen && editModal.data && (
                <Portal onClose={editModal.close}>
                    <EditPatient
                        patient={editModal.data}
                        onClose={editModal.close}
                        onSave={(body) => handleEdit(editModal.data!.id, body)}
                    />
                </Portal>
            )}

            {deleteModal.isOpen && deleteModal.data && (
                <Portal onClose={deleteModal.close}>
                    <DeleteModal
                        title="Patient"
                        name={`${deleteModal.data.name} ${deleteModal.data.surname}`}
                        onClose={deleteModal.close}
                        onConfirm={() => handleDelete(deleteModal.data!.id)}
                    >
                        <Avatar name={`${deleteModal.data.name} ${deleteModal.data.surname}`} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>
                                {deleteModal.data.name} {deleteModal.data.surname}
                            </span>
                            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{deleteModal.data.email}</span>
                        </div>
                    </DeleteModal>
                </Portal>
            )}
        </>
    );
}
