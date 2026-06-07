'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/api/Auth';
import cls from './LoginForm.module.css';

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError('');
        try {
            await login(data.email, data.password);
            router.push('/admin');
        } catch {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cls.card}>
            <div className={cls.brand}>
                <div className={cls.mark}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                    >
                        <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />
                    </svg>
                </div>
                <span className={cls.wordmark}>MediFlow</span>
            </div>

            <div className={cls.title}>Welcome back</div>
            <div className={cls.sub}>Sign in to your MediFlow workspace.</div>

            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.field}>
                    <span className={cls.label}>Email</span>
                    <div className={cls.inputWrap}>
                        <span className={cls.inputIcon}>
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
                            className={`${cls.input} ${cls.inputHasIcon}`}
                            type="email"
                            placeholder="you@clinic.com"
                            {...register('email', { required: true })}
                        />
                    </div>
                </div>

                <div className={cls.field}>
                    <span className={cls.label}>Password</span>
                    <div className={cls.pwWrap}>
                        <input
                            className={cls.input}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            autoComplete="off"
                            {...register('password', { required: true })}
                        />
                        <button
                            type="button"
                            className={cls.pwToggle}
                            aria-label="Show password"
                            tabIndex={-1}
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {showPassword ? (
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
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {error && <div className={cls.error}>{error}</div>}

                <div className={cls.row}>
                    <button type="button" className={`${cls.link} ${cls.subtle}`}>
                        Forgot password?
                    </button>
                </div>

                <button type="submit" className={cls.submit} disabled={!isValid || loading}>
                    <span>{loading ? 'Signing in…' : 'Sign in'}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
