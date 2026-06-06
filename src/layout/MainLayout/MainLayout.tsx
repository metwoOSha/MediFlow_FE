'use client';

import cls from './MainLayout.module.css';

export default function MainLayout({
    pagination,
    FilterBar,
    children,
}: Readonly<{
    pagination?: React.ReactNode;
    FilterBar?: React.ReactNode;
    children?: React.ReactNode;
}>) {
    return (
        <div className={cls.pageTable}>
            <div className={cls.filterBar}>{FilterBar}</div>
            <div className={cls.content}>{children}</div>
            {pagination}
        </div>
    );
}
