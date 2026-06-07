'use client';

import { LogOutIcon } from '@/components/Icons/Sidebar/LogOutIcon';
import cls from './LogoutModal.module.css';

interface LogoutModalProps {
    userName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({ userName, onClose, onConfirm }: LogoutModalProps) {
    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.icon}>
                <LogOutIcon width={22} height={22} />
            </div>
            <div className={cls.title}>Log out?</div>
            <div className={cls.msg}>
                {`You'll be signed out of ${userName}'s session. You can sign back in anytime.`}
            </div>
            <div className={cls.foot}>
                <button type="button" className={cls.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
                <button type="button" className={cls.confirmBtn} onClick={onConfirm}>
                    <LogOutIcon width={16} height={16} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}
