'use client';

import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import type { Patient } from '@/types/patients.types';
import cls from './EditPatient.module.css';

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface EditPatientProps {
    patient: Patient;
    onClose: () => void;
    onSave: (data: Partial<Pick<Patient, 'name' | 'email' | 'phone'>>) => void;
}

export default function EditPatient({ patient, onClose, onSave }: EditPatientProps) {
    const [firstName, ...rest] = patient.name.split(' ');

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            first_name: firstName,
            last_name: rest.join(' '),
            email: patient.email,
            phone: patient.phone,
        },
    });

    const onSubmit = (data: FormData) => {
        onSave({
            name: `${data.first_name.trim()} ${data.last_name.trim()}`,
            email: data.email.trim(),
            phone: data.phone,
        });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Edit patient</span>
                    <span className={cls.title}>{patient.name}</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className={cls.field}>
                        <span className={cls.label}>First name</span>
                        <input className={cls.input} {...register('first_name', { required: true })} />
                    </div>
                    <div className={cls.field}>
                        <span className={cls.label}>Last name</span>
                        <input className={cls.input} {...register('last_name', { required: true })} />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Email</span>
                        <input className={cls.input} type="email" {...register('email', { required: true })} />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Phone</span>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true, minLength: 17 }}
                            render={({ field }) => (
                                <IMaskInput
                                    mask="+0 (000) 000-0000"
                                    defaultValue={field.value}
                                    onAccept={(val: string) => field.onChange(val)}
                                    inputRef={field.ref}
                                    className={cls.input}
                                />
                            )}
                        />
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
