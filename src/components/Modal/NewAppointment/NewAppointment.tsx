'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Calendar from '@/components/Calendar/Calendar';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import { ArrowIcon } from '@/components/Icons/Select/ArrowIcon';
import type { Appointment } from '@/types/appointments.types';
import { SPECIALIZATION_ITEMS } from '@/config/Select.config';
import type { Doctor } from '@/types/doctors.types';
import type { Patient } from '@/types/patients.types';
import cls from './NewAppointment.module.css';

const TIMES = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
];
const STATUSES = [
    { value: 'Pending', color: 'var(--amber)' },
    { value: 'Confirmed', color: 'var(--green)' },
    { value: 'Cancelled', color: 'var(--red)' },
];

const today = new Date();
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const todayStr = `${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

interface NewAppointmentProps {
    doctors: Doctor[];
    patients: Patient[];
    onClose: () => void;
    onSave: (data: Omit<Appointment, 'id'>) => void;
}

type OpenField = 'patient' | 'doctor' | 'time' | 'status' | null;

export default function NewAppointment({ doctors, patients, onClose, onSave }: NewAppointmentProps) {
    const [patient, setPatient] = useState<Patient>(patients[0]);
    const [doctor, setDoctor] = useState<Doctor>(doctors[0]);
    const [date, setDate] = useState(todayStr);
    const [time, setTime] = useState('09:00');
    const [status, setStatus] = useState(STATUSES[0]);
    const [openField, setOpenField] = useState<OpenField>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const doctorColor = useMemo(
        () => (d: Doctor) =>
            SPECIALIZATION_ITEMS.find((s) => s.spec === d.specialization_name)?.color ?? 'var(--text-3)',
        [],
    );

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                setOpenField(null);
            }
        };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    const toggle = (field: OpenField) => setOpenField((p) => (p === field ? null : field));

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>New appointment</span>
                    <span className={cls.title}>Schedule appointment</span>
                </div>
                <button type="button" aria-label="Close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.form} ref={formRef}>
                {/* Patient */}
                <div className="mf-field">
                    <span className={cls.label}>Patient</span>
                    <div className={cls.cs}>
                        <button
                            type="button"
                            className={`${cls.csTrigger} ${openField === 'patient' ? cls.csActive : ''}`}
                            onClick={() => toggle('patient')}
                        >
                            <span className={cls.csVal}>
                                {patient.name} {patient.surname}
                            </span>
                            <span className={`${cls.csChev} ${openField === 'patient' ? cls.csChevRot : ''}`}>
                                <ArrowIcon />
                            </span>
                        </button>
                        {openField === 'patient' && (
                            <ul className={cls.csPanel}>
                                {patients.map((p) => (
                                    <li
                                        key={p.id}
                                        className={`${cls.csOpt} ${p.id === patient.id ? cls.csOptSel : ''}`}
                                        onClick={() => {
                                            setPatient(p);
                                            setOpenField(null);
                                        }}
                                    >
                                        <span className={cls.csOptLabel}>
                                            {p.name} {p.surname}
                                        </span>
                                        {p.id === patient.id && <CheckIcon stroke="var(--cyan)" />}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Doctor */}
                <div className="mf-field">
                    <span className={cls.label}>Doctor</span>
                    <div className={cls.cs}>
                        <button
                            type="button"
                            className={`${cls.csTrigger} ${openField === 'doctor' ? cls.csActive : ''}`}
                            onClick={() => toggle('doctor')}
                        >
                            <span className={cls.csDot} style={{ background: doctorColor(doctor) }} />
                            <span className={cls.csVal}>
                                Dr. {doctor.name} {doctor.surname}
                            </span>
                            <span className={`${cls.csChev} ${openField === 'doctor' ? cls.csChevRot : ''}`}>
                                <ArrowIcon />
                            </span>
                        </button>
                        {openField === 'doctor' && (
                            <ul className={cls.csPanel}>
                                {doctors.map((d) => (
                                    <li
                                        key={d.id}
                                        className={`${cls.csOpt} ${d.id === doctor.id ? cls.csOptSel : ''}`}
                                        onClick={() => {
                                            setDoctor(d);
                                            setOpenField(null);
                                        }}
                                    >
                                        <span className={cls.csDot} style={{ background: doctorColor(d) }} />
                                        <span className={cls.csOptCol}>
                                            <span className={cls.csOptLabel}>
                                                Dr. {d.name} {d.surname}
                                            </span>
                                            <span className={cls.csOptSub}>{d.specialization_name}</span>
                                        </span>
                                        {d.id === doctor.id && <CheckIcon stroke="var(--cyan)" />}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Date */}
                <div className="mf-field" onMouseDown={() => setOpenField(null)}>
                    <span className={cls.label}>Date</span>
                    <Calendar fullWidth onSelect={setDate} />
                </div>

                {/* Time */}
                <div className="mf-field">
                    <span className={cls.label}>Time</span>
                    <div className={cls.cs}>
                        <button
                            type="button"
                            className={`${cls.csTrigger} ${openField === 'time' ? cls.csActive : ''}`}
                            onClick={() => toggle('time')}
                        >
                            <span className={cls.csVal}>{time}</span>
                            <span className={`${cls.csChev} ${openField === 'time' ? cls.csChevRot : ''}`}>
                                <ArrowIcon />
                            </span>
                        </button>
                        {openField === 'time' && (
                            <ul className={cls.csPanel}>
                                {TIMES.map((t) => (
                                    <li
                                        key={t}
                                        className={`${cls.csOpt} ${t === time ? cls.csOptSel : ''}`}
                                        onClick={() => {
                                            setTime(t);
                                            setOpenField(null);
                                        }}
                                    >
                                        <span className={cls.csOptLabel}>{t}</span>
                                        {t === time && <CheckIcon stroke="var(--cyan)" />}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Status */}
                <div className="mf-field full">
                    <span className={cls.label}>Status</span>
                    <div className={cls.cs}>
                        <button
                            type="button"
                            className={`${cls.csTrigger} ${openField === 'status' ? cls.csActive : ''}`}
                            onClick={() => toggle('status')}
                        >
                            <span className={cls.csDot} style={{ background: status.color }} />
                            <span className={cls.csVal}>{status.value}</span>
                            <span className={`${cls.csChev} ${openField === 'status' ? cls.csChevRot : ''}`}>
                                <ArrowIcon />
                            </span>
                        </button>
                        {openField === 'status' && (
                            <ul className={cls.csPanel}>
                                {STATUSES.map((s) => (
                                    <li
                                        key={s.value}
                                        className={`${cls.csOpt} ${s.value === status.value ? cls.csOptSel : ''}`}
                                        onClick={() => {
                                            setStatus(s);
                                            setOpenField(null);
                                        }}
                                    >
                                        <span className={cls.csDot} style={{ background: s.color }} />
                                        <span className={cls.csOptLabel}>{s.value}</span>
                                        {s.value === status.value && <CheckIcon stroke="var(--cyan)" />}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className={cls.foot}>
                <button type="button" className={cls.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
                <button
                    type="button"
                    className={cls.saveBtn}
                    onClick={() =>
                        onSave({
                            name: `${patient.name} ${patient.surname}`,
                            doctor: `Dr. ${doctor.name} ${doctor.surname}`,
                            spec: doctor.specialization_name,
                            date,
                            time,
                            status: status.value,
                        })
                    }
                >
                    <CheckIcon strokeWidth="2.2" />
                    <span>Create appointment</span>
                </button>
            </div>
        </div>
    );
}
