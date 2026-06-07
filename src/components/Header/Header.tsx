'use client';

import { usePathname } from 'next/navigation';

import Input from '../Input/Input';
import cls from './Header.module.css';
import { HEADER_CONFIG } from '@/config/Header.config';
import Buttons from '../Buttons/Buttons';
import { HamburgerIcon } from '../Icons/Header/HamburgerIcon';
// import { BellIcon } from '../Icons/Header/BellIcon';
// import { SettingsHeaderIcon } from '../Icons/Header/SettingsHeaderIcon';
import AdminChip from '../AdminChip/AdminChip';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    userName: string;
    role: string;
}

export default function Header({ userName, role, ...props }: HeaderProps) {
    const pathname = usePathname();
    const page = HEADER_CONFIG[pathname as keyof typeof HEADER_CONFIG];
    return (
        <header className={cls.header} {...props}>
            <div className={cls.hamburgerButton}>
                <Buttons variant="icon" icon={<HamburgerIcon />} />
            </div>
            <div className={cls.topBar}>
                <span className={cls.crumb}>{page.crumb}</span>
                <span className={cls.title}>{page.title}</span>
            </div>
            <Input placeholder="Search patients, doctors, appointments…" style={{ marginLeft: '16px' }} />
            <div className={cls.headerActions}>
                {/* <Buttons variant="icon" icon={<BellIcon />} /> */}
                {/* <Buttons variant="icon" icon={<SettingsHeaderIcon />} /> */}
                <AdminChip name={userName} role={role} />
            </div>
        </header>
    );
}
