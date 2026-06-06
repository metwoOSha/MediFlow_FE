'use client';

import { ArrowIcon } from '../Icons/Buttons/ArrowIcon';
import cls from './Pagination.module.css';

interface PaginationProps {
    total: number;
    limit: number;
    page: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ total, limit, page, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(total / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    const pagination = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={cls.pagination}>
            <div className={cls.pagInfo}>
                Showing
                <strong style={{ color: 'var(--text-1)' }}>{` ${from}–${to} `}</strong>
                of {total}
            </div>
            <div className={cls.pagControls}>
                <button className={cls.pagBtn} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                    <ArrowIcon />
                </button>
                {pagination.map((item) => (
                    <button
                        key={item}
                        className={`${cls.pagBtn} ${item === page ? cls.active : ''}`}
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </button>
                ))}
                <button className={cls.pagBtn} disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                    <ArrowIcon style={{ transform: 'scaleX(-1)' }} />
                </button>
            </div>
        </div>
    );
}
