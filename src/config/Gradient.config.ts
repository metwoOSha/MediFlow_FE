export const GRADIENTS = [
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #10b981, #5eead4)',
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #ec4899, #f97316)',
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #14b8a6, #84cc16)',
];

export const SPEC_COLORS: Record<string, { sp1: string; sp2: string }> = {
    Cardiology: { sp1: '#f87171', sp2: '#fb923c' },
    Neurology: { sp1: '#a78bfa', sp2: '#60a5fa' },
    Pediatrics: { sp1: '#34d399', sp2: '#22d3ee' },
    Orthopedics: { sp1: '#10b981', sp2: '#5eead4' },
    Dermatology: { sp1: '#f472b6', sp2: '#a78bfa' },
    Ophthalmology: { sp1: '#5eead4', sp2: '#10b981' },
    Dentistry: { sp1: '#22d3ee', sp2: '#3b82f6' },
    'Internal Medicine': { sp1: '#fbbf24', sp2: '#f97316' },
    Pharmacology: { sp1: '#84cc16', sp2: '#22d3ee' },
};

export const CATEGORY_COLORS: Record<string, string> = {
    highest: '#a78bfa',
    first: '#60a5fa',
    second: '#34d399',
};
