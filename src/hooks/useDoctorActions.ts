import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { addDoctor, deleteDoctor, updateDoctor } from '@/api/Doctors';
import type { Doctor } from '@/types/doctors.types';

export function useDoctorActions() {
    const router = useRouter();
    const createModal = useModal<boolean>();
    const editModal = useModal<Doctor>();
    const scheduleModal = useModal<Doctor>();
    const deleteModal = useModal<Doctor>();

    const handleCreate = async (body: Omit<Doctor, 'id' | 'created_at' | 'specialization_name'>) => {
        await addDoctor(body);
        createModal.close();
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deleteDoctor(id);
        deleteModal.close();
        router.refresh();
    };

    const handleEdit = async (id: string, body: Partial<Doctor>) => {
        await updateDoctor(id, body);
        editModal.close();
        router.refresh();
    };

    return {
        createModal,
        editModal,
        scheduleModal,
        deleteModal,
        handleCreate,
        handleDelete,
        handleEdit,
    };
}
