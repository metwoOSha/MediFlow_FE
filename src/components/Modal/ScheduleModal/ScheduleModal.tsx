import { Avatar } from '@/components/Avatar/Avatar';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { StethoscopeIcon } from '@/components/Icons/Modal/StethoscopeIcon';
import { TimeIcon } from '@/components/Icons/TimeIcon';
import { CalendarIcon } from '@/components/Icons/StatisticsCard/CalendarIcon';
import type { Doctor } from '@/types/doctors.types';
import cls from './ScheduleModal.module.css';

const CHART_START = 7;
const CHART_END = 19;
const CHART_SPAN = CHART_END - CHART_START;

const TICKS = Array.from({ length: 7 }, (_, i) => CHART_START + i * 2);

const DAYS = [
    { id: 1, label: 'Mon' },
    { id: 2, label: 'Tue' },
    { id: 3, label: 'Wed' },
    { id: 4, label: 'Thu' },
    { id: 5, label: 'Fri' },
    { id: 6, label: 'Sat' },
    { id: 7, label: 'Sun' },
];

const STATUS_CLASS: Record<string, string> = {
    Confirmed: 'green',
    Pending: 'amber',
    Cancelled: 'red',
};

export interface Visit {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface ScheduleModalProps {
    doctor: Doctor;
    visits?: Visit[];
    onClose: () => void;
}

function toPercent(timeStr: string): number {
    const [h, m] = timeStr.split(':').map(Number);
    return ((h + m / 60 - CHART_START) / CHART_SPAN) * 100;
}

export default function ScheduleModal({ doctor, visits = [], onClose }: ScheduleModalProps) {
    const startTime = doctor.time_start.slice(0, 5);
    const endTime = doctor.time_end.slice(0, 5);
    const blockTop = toPercent(startTime);
    const blockHeight = toPercent(endTime) - blockTop;
    const activeDays = new Set(doctor.day_of_week);

    return (
        <div className={cls.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Weekly schedule</span>
                    <span className={cls.title}>
                        Dr. {doctor.name} {doctor.surname}
                    </span>
                </div>
                <button type="button" className={cls.closeBtn} aria-label="Close" onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.meta}>
                <span className={cls.pill}>
                    <StethoscopeIcon />
                    {doctor.specialization_name}
                </span>
                <span className={cls.pill}>
                    <TimeIcon width={14} height={14} />
                    {startTime} – {endTime}
                </span>
                <span className={cls.pill}>
                    <CalendarIcon width={14} height={14} />
                    {activeDays.size} days / week
                </span>
            </div>

            <div className={cls.chart}>
                <div className={cls.axis}>
                    {TICKS.map((h, i) => (
                        <span key={h} className={cls.tick} style={{ top: `${(i / (TICKS.length - 1)) * 100}%` }}>
                            {String(h).padStart(2, '0')}:00
                        </span>
                    ))}
                </div>
                <div className={cls.grid}>
                    {DAYS.map(({ id, label }) => {
                        const isActive = activeDays.has(id);
                        return (
                            <div key={id} className={cls.col}>
                                <div className={cls.track}>
                                    {TICKS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={cls.line}
                                            style={{ top: `${(i / (TICKS.length - 1)) * 100}%` }}
                                        />
                                    ))}
                                    {isActive && (
                                        <div
                                            className={cls.block}
                                            style={{ top: `${blockTop}%`, height: `${blockHeight}%` }}
                                        >
                                            <span className={cls.blockTime}>{startTime}</span>
                                            <span className={`${cls.blockTime} ${cls.end}`}>{endTime}</span>
                                        </div>
                                    )}
                                </div>
                                <span className={cls.day} data-active={isActive || undefined}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {visits.length > 0 && (
                <div className={cls.upcoming}>
                    <span className={cls.upLabel}>Upcoming visits</span>
                    <div className={cls.visits}>
                        {visits.map((visit) => (
                            <div key={visit.id} className={cls.visit}>
                                <Avatar size="sm" name={visit.patientName} />
                                <div className={cls.visitCol}>
                                    <span className={cls.svName}>{visit.patientName}</span>
                                    <span className={cls.svMeta}>{visit.date}</span>
                                </div>
                                <span className={cls.timePill}>
                                    <TimeIcon />
                                    {visit.time}
                                </span>
                                <span className={`badge ${STATUS_CLASS[visit.status]}`}>
                                    <span className="dot" />
                                    {visit.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={cls.foot}>
                <button type="button" className={cls.doneBtn} onClick={onClose}>
                    Done
                </button>
            </div>
        </div>
    );
}
