import type { ReactElement } from 'react';

export interface NavItem {
    id: number;
    label: string;
    icon: ReactElement;
    href: string;
}
