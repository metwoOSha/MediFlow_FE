import { DeleteModalIcon } from '@/components/Icons/Modal/DeleteModalIcon';

import cls from './DeleteModal.module.css';
import { DeleteIcon } from '@/components/Icons/Buttons/DeleteIcon';

interface DeleteModalProps {
    title: string;
    name?: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ title, name, children, onClose, onConfirm }: DeleteModalProps) {
    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.delIcon}>
                <DeleteModalIcon />
            </div>
            <div className={cls.delTitle}>{`Delete this ${title}`}</div>
            <div className={cls.delCard}>{children}</div>
            <div className={cls.delMsg}>
                This will permanently remove {name ?? `this ${title.toLowerCase()}`} and all associated data. This
                action cannot be undone.
            </div>
            <div className={cls.delFoot} style={{ justifyContent: 'stretch' }}>
                <button
                    type="button"
                    className={`${cls.btn} ${cls.ghost}`}
                    style={{ flex: '1 1 0%' }}
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className={`${cls.btn} ${cls.danger}`}
                    style={{ flex: '1 1 0%' }}
                    onClick={onConfirm}
                >
                    <DeleteIcon />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}
