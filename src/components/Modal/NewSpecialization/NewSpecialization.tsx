'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SPEC_ICONS } from '@/config/Specializations.config';
import { SPEC_COLORS_LIST } from '@/config/Gradient.config';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import cls from './NewSpecialization.module.css';

interface FormData {
    specialization_name: string;
}

interface NewSpecializationProps {
    onClose: () => void;
    onSave: (data: { specialization_name: string; icon_id: number; color_id: number }) => void;
}

export default function NewSpecialization({ onClose, onSave }: NewSpecializationProps) {
    const [iconId, setIconId] = useState(1);
    const [colorId, setColorId] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: { specialization_name: '' },
    });

    const onSubmit = (data: FormData) => {
        onSave({ specialization_name: data.specialization_name.trim(), icon_id: iconId, color_id: colorId });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>New specialization</span>
                    <span className={cls.title}>Add specialization</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className={cls.field}>
                        <span className={cls.label}>Name</span>
                        <input
                            className={cls.input}
                            placeholder="e.g. Endocrinology"
                            {...register('specialization_name', { required: true })}
                        />
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
                        <span>Add specialization</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
