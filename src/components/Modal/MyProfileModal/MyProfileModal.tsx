'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import { Avatar } from '@/components/Avatar/Avatar';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import { changePassword } from '@/api/Auth';
import cls from './MyProfileModal.module.css';

const ROLE_LABELS: Record<string, string> = {
    admin: 'Clinic Administrator',
    doctor: 'Doctor',
};

interface ProfileFormData {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

interface PwFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface MyProfileModalProps {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    onClose: () => void;
}

export default function MyProfileModal({ firstName, lastName, email, role, onClose }: MyProfileModalProps) {
    const [pwOpen, setPwOpen] = useState(false);
    const [pwError, setPwError] = useState('');
    const [pwSuccess, setPwSuccess] = useState(false);
    const fullName = `${firstName} ${lastName}`.trim();
    const roleLabel = ROLE_LABELS[role] ?? role;

    const {
        register,
        control,
        formState: { isDirty, isValid },
    } = useForm<ProfileFormData>({
        mode: 'onChange',
        defaultValues: { name: firstName, surname: lastName, email, phone: '' },
    });

    const {
        register: regPw,
        handleSubmit: handlePwSubmit,
        watch,
        reset: resetPw,
        formState: { isValid: isPwValid, isSubmitting: isPwSubmitting },
    } = useForm<PwFormData>({
        mode: 'onChange',
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    });

    const newPassword = watch('newPassword');

    const onPwSubmit = async (data: PwFormData) => {
        setPwError('');
        setPwSuccess(false);
        try {
            await changePassword(data.currentPassword, data.newPassword);
            setPwSuccess(true);
            resetPw();
        } catch (err) {
            setPwError(err instanceof Error ? err.message : 'Failed to change password');
        }
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Account</span>
                    <span className={cls.title}>My profile</span>
                </div>
                <button type="button" className={cls.closeBtn} aria-label="Close" onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.patient}>
                <Avatar name={fullName} size="md" />
                <div className={cls.patientMeta}>
                    <span className={cls.patientName}>{fullName}</span>
                    <span className={cls.patientSub}>
                        {roleLabel} · {email}
                    </span>
                </div>
            </div>

            <div className={cls.form}>
                <div className="mf-field">
                    <span className={cls.label}>First name</span>
                    <input className={cls.input} {...register('name', { required: true })} />
                </div>
                <div className="mf-field">
                    <span className={cls.label}>Last name</span>
                    <input className={cls.input} {...register('surname', { required: true })} />
                </div>
                <div className="mf-field full">
                    <span className={cls.label}>Email</span>
                    <div className={cls.inputWrap}>
                        <span className={cls.inputIc}>
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
                                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                                <path d="M3 7l9 6 9-6" />
                            </svg>
                        </span>
                        <input
                            className={`${cls.input} ${cls.hasIc}`}
                            type="email"
                            {...register('email', { required: true })}
                        />
                    </div>
                </div>
                <div className="mf-field full">
                    <span className={cls.label}>Phone</span>
                    <Controller
                        name="phone"
                        control={control}
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
            </div>

            <div className={cls.pw}>
                <button
                    type="button"
                    className={`${cls.pwHead} ${pwOpen ? cls.pwOpen : ''}`}
                    onClick={() => {
                        setPwOpen((v) => !v);
                        setPwError('');
                        setPwSuccess(false);
                    }}
                >
                    <span className={cls.pwIc}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="4.5" y="11" width="15" height="9" rx="2.2" />
                            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                        </svg>
                    </span>
                    <span className={cls.pwText}>
                        <span className={cls.pwTitle}>Change password</span>
                        <span className={cls.pwSub}>Update the password used to sign in.</span>
                    </span>
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
                        className={cls.pwChev}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {pwOpen && (
                    <form className={cls.pwFields} onSubmit={handlePwSubmit(onPwSubmit)}>
                        <div className="mf-field full">
                            <span className={cls.label}>Current password</span>
                            <input
                                className={cls.input}
                                type="password"
                                placeholder="••••••••"
                                {...regPw('currentPassword', { required: true })}
                            />
                        </div>
                        <div className="mf-field full">
                            <span className={cls.label}>New password</span>
                            <input
                                className={cls.input}
                                type="password"
                                placeholder="••••••••"
                                {...regPw('newPassword', { required: true, minLength: 6 })}
                            />
                        </div>
                        <div className="mf-field full">
                            <span className={cls.label}>Confirm new password</span>
                            <input
                                className={cls.input}
                                type="password"
                                placeholder="••••••••"
                                {...regPw('confirmPassword', {
                                    required: true,
                                    validate: (v) => v === newPassword || 'Passwords do not match',
                                })}
                            />
                        </div>

                        {pwError && <span className={cls.pwError}>{pwError}</span>}
                        {pwSuccess && <span className={cls.pwSuccess}>Password updated successfully</span>}

                        <button type="submit" className={cls.pwSaveBtn} disabled={!isPwValid || isPwSubmitting}>
                            <CheckIcon width={15} height={15} strokeWidth="2.2" />
                            <span>{isPwSubmitting ? 'Updating…' : 'Update password'}</span>
                        </button>
                    </form>
                )}
            </div>

            <div className={cls.foot}>
                <button type="button" className={cls.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
                <button type="button" className={cls.saveBtn} disabled={!isDirty || !isValid}>
                    <CheckIcon width={16} height={16} strokeWidth="2.4" />
                    <span>Save changes</span>
                </button>
            </div>
        </div>
    );
}
