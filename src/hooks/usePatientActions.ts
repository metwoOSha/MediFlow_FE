import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { createPatient, updatePatient, deletePatient } from '@/api/Patients';
import type { Patient } from '@/types/patients.types';

export function usePatientActions() {
    const router = useRouter();
    const createModal = useModal<boolean>();
    const viewModal = useModal<Patient>();
    const editModal = useModal<Patient>();
    const deleteModal = useModal<Patient>();

    const handleCreate = async (body: Pick<Patient, 'name' | 'surname' | 'email' | 'phone'> & { password: string }) => {
        await createPatient(body);
        createModal.close();
        router.refresh();
    };

    const handleEdit = async (id: string, body: Partial<Pick<Patient, 'name' | 'surname' | 'email' | 'phone'>>) => {
        await updatePatient(id, body);
        editModal.close();
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deletePatient(id);
        deleteModal.close();
        router.refresh();
    };

    return { createModal, viewModal, editModal, deleteModal, handleCreate, handleEdit, handleDelete };
}
