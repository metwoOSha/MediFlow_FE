import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { deleteDoctor, updateDoctor } from '@/api/Doctors';
import type { Doctor } from '@/types/doctors.types';

export function useDoctorActions() {
    const router = useRouter();
    const editModal = useModal<Doctor>();
    const scheduleModal = useModal<Doctor>();
    const deleteModal = useModal<Doctor>();

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
        editModal,
        scheduleModal,
        deleteModal,
        handleDelete,
        handleEdit,
    };
}
