'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SPEC_ICONS } from '@/config/Specializations.config';
import { SPEC_COLORS_LIST } from '@/config/Gradient.config';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import type { Specialization } from '@/types/specializations.types';
import cls from './EditSpecialization.module.css';

interface FormData {
    specialization_name: string;
}

interface EditSpecializationProps {
    specialization: Specialization;
    onClose: () => void;
    onSave: (data: Partial<Omit<Specialization, 'id' | 'doctors_count'>>) => void;
}

export default function EditSpecialization({ specialization, onClose, onSave }: EditSpecializationProps) {
    const [iconId, setIconId] = useState(specialization.icon_id);
    const [colorId, setColorId] = useState(specialization.color_id);

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: { specialization_name: specialization.specialization_name },
    });

    const onSubmit = (data: FormData) => {
        onSave({ specialization_name: data.specialization_name.trim(), icon_id: iconId, color_id: colorId });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Edit specialization</span>
                    <span className={cls.title}>{specialization.specialization_name}</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className={cls.field}>
                        <span className={cls.label}>Name</span>
                        <input className={cls.input} {...register('specialization_name', { required: true })} />
                    </div>

                    <div className={cls.field}>
                        <span className={cls.label}>Icon</span>
                        <div className={cls.chips}>
                            {SPEC_ICONS.map(({ id, icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={`${cls.chip} ${iconId === id ? cls.chipOn : ''}`}
                                    onClick={() => setIconId(id)}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={cls.field}>
                        <span className={cls.label}>Color</span>
                        <div className={cls.chips}>
                            {SPEC_COLORS_LIST.map(({ id, sp1, sp2 }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={`${cls.swatch} ${colorId === id ? cls.swatchOn : ''}`}
                                    style={{ background: `linear-gradient(135deg, ${sp1}, ${sp2})` }}
                                    onClick={() => setColorId(id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cls.foot}>
                    <button type="button" className={cls.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={cls.saveBtn} disabled={!isValid}>
                        <CheckIcon />
                        <span>Save changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
