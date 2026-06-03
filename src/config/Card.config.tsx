import { CalendarIcon } from '@/components/Icons/StatisticsCard/CalendarIcon';
import { CancelIcon } from '@/components/Icons/StatisticsCard/CancelIcon';
import { CheckIcon } from '@/components/Icons/StatisticsCard/CheckIcon';
import { ClockIcon } from '@/components/Icons/StatisticsCard/ClockIcon';

interface CardConfig {
    icon: React.ReactElement;
    style: React.CSSProperties;
}

export const CARD_CONFIG: Record<string, CardConfig> = {
    'Appointments today': {
        icon: <CalendarIcon />,
        style: {
            '--stat-glow': 'rgba(16,185,129,0.35)',
            '--stat-color': '#34d399',
            '--stat-icon-1': 'rgba(16,185,129,0.30)',
            '--stat-icon-2': 'rgba(94,234,212,0.14)',
        } as React.CSSProperties,
    },
    'Awaiting confirmation': {
        icon: <ClockIcon />,

        style: {
            '--stat-glow': 'rgba(249,178,87,0.30)',
            '--stat-color': '#fbcb86',
            '--stat-icon-1': 'rgba(249,178,87,0.26)',
            '--stat-icon-2': 'rgba(249,178,87,0.10)',
        } as React.CSSProperties,
    },
    'Checked in': {
        icon: <CheckIcon />,
        style: {
            '--stat-glow': 'rgba(52,211,153,0.30)',
            '--stat-color': '#6ee7b7',
            '--stat-icon-1': 'rgba(52,211,153,0.28)',
            '--stat-icon-2': 'rgba(94,234,212,0.12)',
        } as React.CSSProperties,
    },
    'Cancelled / no-show': {
        icon: <CancelIcon />,
        style: {
            '--stat-glow': 'rgba(248,113,113,0.28)',
            '--stat-color': '#fca5a5',
            '--stat-icon-1': 'rgba(248,113,113,0.25)',
            '--stat-icon-2': 'rgba(249,178,87,0.12)',
        } as React.CSSProperties,
    },
};
