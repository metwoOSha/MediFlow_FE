'use client';

import SpecializationsCard from '@/components/SpecializationsCard/SpecializationsCard';
import Portal from '@/utils/Portal/Portal';
import EditSpecialization from '@/components/Modal/EditSpecialization/EditSpecialization';
import DeleteModal from '@/components/Modal/DeleteModal/DeleteModal';
import { SPEC_ICONS } from '@/config/Specializations.config';
import { SPEC_COLORS_LIST } from '@/config/Gradient.config';
import { useSpecializationActions } from '@/hooks/useSpecializationActions';
import type { Specialization } from '@/types/specializations.types';
import cls from './SpecializationsList.module.css';

interface SpecializationsListProps {
    data: Specialization[];
}

export default function SpecializationsList({ data }: SpecializationsListProps) {
    const { editModal, deleteModal, handleEdit, handleDelete } = useSpecializationActions();

    return (
        <>
            <div className={cls.specGrid}>
                {data.map((spec) => (
                    <SpecializationsCard
                        key={spec.id}
                        name={spec.specialization_name}
                        count={spec.doctors_count}
                        icon_id={spec.icon_id}
                        color_id={spec.color_id}
                        onEdit={() => editModal.open(spec)}
                        onDelete={() => deleteModal.open(spec)}
                    />
                ))}
            </div>

            {editModal.isOpen && editModal.data && (
                <Portal onClose={editModal.close}>
                    <EditSpecialization
                        specialization={editModal.data}
                        onClose={editModal.close}
                        onSave={(body) => handleEdit(editModal.data!.id, body)}
                    />
                </Portal>
            )}

            {deleteModal.isOpen && deleteModal.data && (
                <Portal onClose={deleteModal.close}>
                    <DeleteModal
                        title="Specialization"
                        name={deleteModal.data.specialization_name}
                        onClose={deleteModal.close}
                        onConfirm={() => handleDelete(deleteModal.data!.id)}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                display: 'grid',
                                placeItems: 'center',
                                background: `linear-gradient(135deg, ${
                                    (
                                        SPEC_COLORS_LIST.find((c) => c.id === deleteModal.data!.color_id) ?? {
                                            sp1: '#8b5cf6',
                                            sp2: '#ec4899',
                                        }
                                    ).sp1
                                }, ${
                                    (
                                        SPEC_COLORS_LIST.find((c) => c.id === deleteModal.data!.color_id) ?? {
                                            sp1: '#8b5cf6',
                                            sp2: '#ec4899',
                                        }
                                    ).sp2
                                })`,
                                color: '#fff',
                                flexShrink: 0,
                            }}
                        >
                            {SPEC_ICONS.find((i) => i.id === deleteModal.data!.icon_id)?.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>
                                {deleteModal.data.specialization_name}
                            </span>
                            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
                                {`${deleteModal.data.doctors_count} doctors`}
                            </span>
                        </div>
                    </DeleteModal>
                </Portal>
            )}
        </>
    );
}
