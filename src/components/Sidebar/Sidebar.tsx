'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Brand from '../Brand/Brand';
import { LogOutIcon } from '../Icons/Sidebar/LogOutIcon';
import NavSection from '../NavSection/NavSection';
import Portal from '@/utils/Portal/Portal';
import LogoutModal from '@/components/Modal/LogoutModal/LogoutModal';
import { logout } from '@/api/Auth';
import cls from './Sidebar.module.css';

import { WORKSPACE_NAV_ITEMS } from '@/config/Sidebar.config';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    userName: string;
}

export function Sidebar({ userName, ...props }: SidebarProps) {
    const router = useRouter();
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/auth');
    };

    return (
        <aside className={cls.aside} {...props}>
            <Brand />
            <NavSection label="Workspace" items={WORKSPACE_NAV_ITEMS} />
            <div className={cls.sidebarFooter}>
                <div className={cls.navItem} onClick={() => setLogoutOpen(true)}>
                    <LogOutIcon />
                    <span>Log out</span>
                </div>
            </div>

            {logoutOpen && (
                <Portal onClose={() => setLogoutOpen(false)}>
                    <LogoutModal userName={userName} onClose={() => setLogoutOpen(false)} onConfirm={handleLogout} />
                </Portal>
            )}
        </aside>
    );
}
