'use client';

import type { NavItem } from '@/types/sidebar.types';
import cls from './NavSection.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavSectionProps {
    label: string;
    items: NavItem[];
}

export default function NavSection({ label, items }: NavSectionProps) {
    const pathname = usePathname();
    return (
        <nav className={cls.navSection}>
            <div className={cls.navLabel}>{label}</div>
            {items.map(({ id, label, icon, href }) => (
                <Link href={href} key={id} className={`${cls.navItem} ${pathname === href ? cls.active : ''}`}>
                    {icon}
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
    );
}
