'use client';

import { Avatar } from '../Avatar/Avatar';
import cls from './ProfileMenu.module.css';

interface ProfileMenuProps {
    name: string;
    email: string;
    onProfile: () => void;
    onLogout: () => void;
}

export default function ProfileMenu({ name, email, onProfile, onLogout }: ProfileMenuProps) {
    return (
        <div className={cls.menu}>
            <div className={cls.head}>
                <Avatar name={name} />
                <div className={cls.headMeta}>
                    <span className={cls.headName}>{name}</span>
                    <span className={cls.headEmail}>{email}</span>
                </div>
            </div>

            <div className={cls.item} onClick={onProfile}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                    <circle cx="17" cy="9" r="2.6" />
                    <path d="M16 20a5 5 0 0 1 5.5-5" />
                </svg>
                <span>My profile</span>
            </div>

            <div className={cls.sep} />

            <div className={`${cls.item} ${cls.danger}`} onClick={onLogout}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
                    <path d="M10 17l-5-5 5-5" />
                    <path d="M5 12h12" />
                </svg>
                <span>Log out</span>
            </div>
        </div>
    );
}
