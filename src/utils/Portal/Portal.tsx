'use client';

import { createPortal } from 'react-dom';

import cls from './Portal.module.css';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return createPortal(<div className={cls.overlay}>{children}</div>, document.body);
}
