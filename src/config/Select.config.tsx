import { CATEGORY_COLORS } from './Gradient.config';

export type SelectItem = { id: number; spec: string; color: string };

export const SPECIALIZATION_ITEMS: SelectItem[] = [
    { id: 1, spec: 'Cardiology', color: '#f87171' },
    { id: 2, spec: 'Neurology', color: '#a78bfa' },
    { id: 3, spec: 'Pediatrics', color: '#34d399' },
    { id: 4, spec: 'Orthopedics', color: '#10b981' },
    { id: 5, spec: 'Dermatology', color: '#f472b6' },
    { id: 6, spec: 'Ophthalmology', color: '#22d3ee' },
    { id: 7, spec: 'Internal Medicine', color: '#fbbf24' },
    { id: 8, spec: 'Dentistry', color: '#3b82f6' },
];

export const CATEGORY_ITEMS: SelectItem[] = [
    { id: 1, spec: 'Highest', color: CATEGORY_COLORS['Highest'] },
    { id: 2, spec: 'First', color: CATEGORY_COLORS['First'] },
    { id: 3, spec: 'Second', color: CATEGORY_COLORS['Second'] },
];
