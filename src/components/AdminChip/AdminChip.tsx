'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar } from '../Avatar/Avatar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import LogoutModal from '../Modal/LogoutModal/LogoutModal';
import MyProfileModal from '../Modal/MyProfileModal/MyProfileModal';
import Portal from '@/utils/Portal/Portal';
import { logout } from '@/api/Auth';
import cls from './AdminChip.module.css';

interface AdminChipProps {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

export default function AdminChip({ firstName, lastName, role, email }: AdminChipProps) {
    const router = useRouter();
    const fullName = `${firstName} ${lastName}`.trim();

    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [menuOpen]);

    const handleLogoutConfirm = async () => {
        await logout();
        router.push('/auth');
    };

    return (
        <>
            <div className={cls.wrapper} ref={ref}>
                <div className={cls.adminChip} onClick={() => setMenuOpen((v) => !v)}>
                    <Avatar name={fullName} />
                    <div className={cls.meta}>
                        <span className={cls.name}>{fullName}</span>
                        <span className={cls.role}>{role}</span>
                    </div>
                </div>

                {menuOpen && (
                    <ProfileMenu
                        name={fullName}
                        email={email}
                        onProfile={() => {
                            setMenuOpen(false);
                            setProfileOpen(true);
                        }}
                        onLogout={() => {
                            setMenuOpen(false);
                            setLogoutOpen(true);
                        }}
                    />
                )}
            </div>

            {profileOpen && (
                <Portal onClose={() => setProfileOpen(false)}>
                    <MyProfileModal
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        role={role}
                        onClose={() => setProfileOpen(false)}
                    />
                </Portal>
            )}

            {logoutOpen && (
                <Portal onClose={() => setLogoutOpen(false)}>
                    <LogoutModal
                        userName={fullName}
                        onClose={() => setLogoutOpen(false)}
                        onConfirm={handleLogoutConfirm}
                    />
                </Portal>
            )}
        </>
    );
}
