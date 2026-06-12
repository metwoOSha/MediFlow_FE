import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { addDoctor, deleteDoctor, updateDoctor, createSchedule, deleteSchedule } from '@/api/Doctors';
import type { Doctor } from '@/types/doctors.types';

export function useDoctorActions() {
    const router = useRouter();
    const createModal = useModal<boolean>();
    const editModal = useModal<Doctor>();
    const scheduleModal = useModal<Doctor>();
    const deleteModal = useModal<Doctor>();

    const handleCreate = async (body: Omit<Doctor, 'id' | 'created_at' | 'specialization_name'>) => {
        const doctor = await addDoctor(body);
        createModal.close();

        if (body.day_of_week?.length && body.time_start && body.time_end) {
            await createSchedule(doctor.id, body.day_of_week, body.time_start, body.time_end);
        }

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

        if (body.day_of_week?.length && body.time_start && body.time_end) {
            await deleteSchedule(id);
            await createSchedule(id, body.day_of_week, body.time_start!, body.time_end!);
        }

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
