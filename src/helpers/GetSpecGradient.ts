import { SPEC_COLORS } from '@/config/Gradient.config';

const FALLBACK = { sp1: '#8b5cf6', sp2: '#ec4899' };

export function getSpecGradient(name: string) {
    return SPEC_COLORS[name] ?? FALLBACK;
}
