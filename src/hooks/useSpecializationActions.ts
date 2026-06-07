import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { createSpecialization, updateSpecialization, deleteSpecialization } from '@/api/Specializations';
import type { Specialization } from '@/types/specializations.types';

export function useSpecializationActions() {
    const router = useRouter();
    const createModal = useModal<boolean>();
    const editModal = useModal<Specialization>();
    const deleteModal = useModal<Specialization>();

    const handleCreate = async (body: Omit<Specialization, 'id' | 'doctors_count'>) => {
        await createSpecialization(body);
        createModal.close();
        router.refresh();
    };

    const handleEdit = async (id: string, body: Partial<Omit<Specialization, 'id' | 'doctors_count'>>) => {
        await updateSpecialization(id, body);
        editModal.close();
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deleteSpecialization(id);
        deleteModal.close();
        router.refresh();
    };

    return { createModal, editModal, deleteModal, handleCreate, handleEdit, handleDelete };
}
