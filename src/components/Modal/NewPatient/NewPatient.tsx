'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import type { Patient } from '@/types/patients.types';
import cls from './NewPatient.module.css';

interface FormData {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
}

interface NewPatientProps {
    onClose: () => void;
    onSave: (data: Pick<Patient, 'name' | 'surname' | 'email' | 'phone'> & { password: string }) => void;
}

export default function NewPatient({ onClose, onSave }: NewPatientProps) {
    const [showPw, setShowPw] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: { name: '', surname: '', email: '', phone: '', password: '' },
    });

    const onSubmit = (data: FormData) => {
        onSave({
            name: data.name.trim(),
            surname: data.surname.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            password: data.password,
        });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>New patient</span>
                    <span className={cls.title}>Register patient</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className={cls.field}>
                        <span className={cls.label}>First name</span>
                        <input className={cls.input} placeholder="Olena" {...register('name', { required: true })} />
                    </div>
                    <div className={cls.field}>
                        <span className={cls.label}>Last name</span>
                        <input
                            className={cls.input}
                            placeholder="Kovalenko"
                            {...register('surname', { required: true })}
                        />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Email</span>
                        <input
                            className={cls.input}
                            type="email"
                            placeholder="olena@email.com"
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Phone</span>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true, minLength: 17 }}
                            render={({ field }) => (
                                <IMaskInput
                                    mask="+00(000) 000-0000"
                                    placeholder="+38(066) 555-0000"
                                    defaultValue={field.value}
                                    onAccept={(val: string) => field.onChange(val)}
                                    inputRef={field.ref}
                                    className={cls.input}
                                />
                            )}
                        />
                    </div>
                    <div className={`${cls.field} ${cls.full}`}>
                        <span className={cls.label}>Password</span>
                        <div className={cls.pwWrap}>
                            <input
                                className={cls.input}
                                type={showPw ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <button
                                type="button"
                                className={cls.pwToggle}
                                onClick={() => setShowPw((v) => !v)}
                                tabIndex={-1}
                            >
                                {showPw ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={cls.foot}>
                    <button type="button" className={cls.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={cls.saveBtn} disabled={!isValid}>
                        <CheckIcon />
                        <span>Add patient</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
