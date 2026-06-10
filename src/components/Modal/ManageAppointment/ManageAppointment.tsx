'use client';

import { useState } from 'react';
import { getInitials } from '@/helpers/GetInitial';
import { getAvatarGradient } from '@/helpers/GetAvatarGradient';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import Badge from '@/components/Badge/Badge';
import cls from './ManageAppointment.module.css';

export type { Appointment } from '@/types/appointments.types';
import type { Appointment } from '@/types/appointments.types';

const STATUS_OPTIONS = [
    { value: 'Pending', color: 'var(--amber)' },
    { value: 'Confirmed', color: 'var(--green)' },
    { value: 'Completed', color: 'var(--blue)' },
    { value: 'Cancelled', color: 'var(--red)' },
];

interface ManageAppointmentProps {
    appointment: Appointment;
    onClose: () => void;
    onSave: (status: string) => void;
}

export default function ManageAppointment({ appointment, onClose, onSave }: ManageAppointmentProps) {
    const [status, setStatus] = useState(appointment.status);
    const changed = status !== appointment.status;

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Appointment</span>
                    <span className={cls.title}>{appointment.name}</span>
                </div>
                <button type="button" aria-label="Close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.patient}>
                <div className={cls.avatar} style={{ background: getAvatarGradient(appointment.name) }}>
                    {getInitials(appointment.name)}
                </div>
                <div className={cls.col}>
                    <span className={cls.patientName}>{appointment.name}</span>
                    <span className={cls.patientStatus}>
                        <Badge variant="status" text={appointment.status} />
                    </span>
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
                            <path d="M6 3v4a4 4 0 0 0 8 0V3" />
                            <path d="M10 13v2a5 5 0 0 0 10 0v-1" />
                            <circle cx="20" cy="11" r="2" />
                        </svg>
                    </span>
                    <span className={cls.rowKey}>Doctor</span>
                    <span className={cls.rowVal}>
                        {appointment.doctor}
                        <span className={cls.rowSub}> · {appointment.spec}</span>
                    </span>
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
                    <span className={cls.rowKey}>Date</span>
                    <span className={cls.rowVal}>{appointment.date}</span>
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
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                    </span>
                    <span className={cls.rowKey}>Time</span>
                    <span className={cls.rowVal}>{appointment.time}</span>
                </div>
            </div>

            <div className={cls.statusSection}>
                <span className={cls.statusLabel}>Status</span>
                <div className={cls.statusGrid}>
                    {STATUS_OPTIONS.map((opt) => {
                        const selected = status === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                className={`${cls.statusOpt} ${selected ? cls.sel : ''}`}
                                style={{ '--ms-c': opt.color } as React.CSSProperties}
                                onClick={() => setStatus(opt.value)}
                            >
                                <span className={cls.dot} style={{ background: opt.color }} />
                                <span className={cls.optLabel}>{opt.value}</span>
                                {selected && (
                                    <span className={cls.check}>
                                        <CheckIcon />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={cls.foot}>
                <button type="button" className={cls.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
                <button type="button" className={cls.saveBtn} disabled={!changed} onClick={() => onSave(status)}>
                    <CheckIcon />
                    <span>Save changes</span>
                </button>
            </div>
        </div>
    );
}
