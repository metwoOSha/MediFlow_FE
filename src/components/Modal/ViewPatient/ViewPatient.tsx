'use client';

import { getInitials } from '@/helpers/GetInitial';
import { getAvatarGradient } from '@/helpers/GetAvatarGradient';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import type { Patient } from '@/types/patients.types';
import cls from './ViewPatient.module.css';

interface ViewPatientProps {
    patient: Patient;
    onClose: () => void;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function ViewPatient({ patient, onClose }: ViewPatientProps) {
    const fullName = `${patient.name} ${patient.surname}`;

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Patient profile</span>
                    <span className={cls.title}>{fullName}</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.patientHead}>
                <div className={cls.avatar} style={{ background: getAvatarGradient(fullName) }}>
                    {getInitials(fullName)}
                </div>
                <div className={cls.col}>
                    <span className={cls.patientName}>{fullName}</span>
                    <span className={cls.patientEmail}>{patient.email}</span>
                </div>
            </div>

            <div className={cls.rows}>
                <div className={cls.row}>
                    <span className={cls.rowIcon}>
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
                    <span className={cls.rowKey}>Email</span>
                    <span className={cls.rowVal}>{patient.email}</span>
                </div>
                <div className={cls.row}>
                    <span className={cls.rowIcon}>
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
                            <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                        </svg>
                    </span>
                    <span className={cls.rowKey}>Phone</span>
                    <span className={cls.rowVal}>{patient.phone}</span>
                </div>
                <div className={cls.row}>
                    <span className={cls.rowIcon}>
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
                            <rect x="3" y="5" width="18" height="16" rx="2.5" />
                            <path d="M3 10h18M8 3v4M16 3v4" />
                        </svg>
                    </span>
                    <span className={cls.rowKey}>Registered</span>
                    <span className={cls.rowVal}>{formatDate(patient.created_at)}</span>
                </div>
            </div>

            <div className={cls.foot}>
                <button type="button" className={cls.doneBtn} onClick={onClose}>
                    Done
                </button>
            </div>
        </div>
    );
}
