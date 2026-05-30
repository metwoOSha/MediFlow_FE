'use client';

import Brand from '../Brand/Brand';
import { LogOutIcon } from '../Icons/Sidebar/LogOutIcon';
import NavSection from '../NavSection/NavSection';
import cls from './Sidebar.module.css';

import { WORKSPACE_NAV_ITEMS } from '@/config/Sidebar.config';
import { SYSTEM_NAV_ITEMS } from '@/config/Sidebar.config';

export function Sidebar({ ...props }) {
    return (
        <aside className={cls.aside} {...props}>
            <Brand />
            <NavSection label="Workspace" items={WORKSPACE_NAV_ITEMS} />
            <NavSection label="Settings" items={SYSTEM_NAV_ITEMS} />
            <div className={cls.sidebarFooter}>
                <div className={cls.navItem}>
                    <LogOutIcon />
                    <span>Log out</span>
                </div>
            </div>
        </aside>
    );
}
