'use client';

import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import cls from './ModalLayout.module.css';
import Buttons from '@/components/Buttons/Buttons';

interface ModalLayoutProps {
    children: React.ReactNode;
    subtitle: string;
    title: string;
    btnText: string;
    onClose: () => void;
}

export default function ModalLayout({ subtitle, title, btnText, onClose, children }: ModalLayoutProps) {
    return (
        <div className={cls.overlay} onClick={onClose}>
            <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
                <div className={cls.modalHead}>
                    <div className={cls.modalTitleWrap}>
                        <span className={cls.modalEyebrow}>{subtitle}</span>
                        <span className={cls.modalTitle}>{title}</span>
                    </div>
                    <button type="button" aria-label="close" className={cls.modalCloseBtn} onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={cls.modalForm}>{children}</div>
                <div className={cls.modalFoot}>
                    <Buttons variant="ghost" text="Cancel" onClick={onClose} />
                    <Buttons variant="primary" text={btnText} />
                </div>
            </div>
        </div>
    );
}
