'use client';

import cls from './MainLayout.module.css';

export default function MainLayout({
    pagination,
    FilterBar,
    children,
}: Readonly<{
    pagination?: boolean;
    FilterBar?: React.ReactNode;
    children?: React.ReactNode;
}>) {
    return (
        <div className={cls.pageTable}>
            <div className={cls.filterBar}>{FilterBar}</div>
            <div className={cls.specGrid}>{children}</div>
            {pagination && <div className={cls.pagination}>pagination</div>}
        </div>
    );
}
