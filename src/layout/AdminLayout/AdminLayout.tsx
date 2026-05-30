'use cleint';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import cls from './AdminLayout.module.css';
import Header from '@/components/Header/Header';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cls.layout}>
            <Sidebar className={cls.sidebar} />
            <Header className={cls.header} />
            <main className={cls.main}>{children}</main>
        </div>
    );
}
