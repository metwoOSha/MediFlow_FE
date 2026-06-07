'use client';

import { useForm } from 'react-hook-form';

import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import type { Patient } from '@/types/patients.types';
import cls from './EditPatient.module.css';

interface FormData {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

interface EditPatientProps {
    patient: Patient;
    onClose: () => void;
    onSave: (data: Partial<Pick<Patient, 'name' | 'surname' | 'email' | 'phone'>>) => void;
}

export default function EditPatient({ patient, onClose, onSave }: EditPatientProps) {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            name: patient.name,
            surname: patient.surname,
            email: patient.email,
            phone: patient.phone,
        },
    });

    const onSubmit = (data: FormData) => {
        onSave({
            name: data.name.trim(),
            surname: data.surname.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
        });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Edit patient</span>
                    <span className={cls.title}>
                        {patient.name} {patient.surname}
                    </span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className={cls.field}>
                        <span className={cls.label}>First name</span>
                        <input className={cls.input} {...register('name', { required: true })} />
                    </div>
                    <div className={cls.field}>
                        <span className={cls.label}>Last name</span>
                        <input className={cls.input} {...register('surname', { required: true })} />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Email</span>
                        <input className={cls.input} type="email" {...register('email', { required: true })} />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Phone</span>
                        <input className={cls.input} type="tel" {...register('phone', { required: true })} />
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
