'use cleint';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import cls from './AdminLayout.module.css';
import Header from '@/components/Header/Header';

const CURRENT_USER = { name: 'Dmytro Dobrovolskyi', role: 'Admin' };

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cls.layout}>
            <Sidebar className={cls.sidebar} userName={CURRENT_USER.name} />
            <Header className={cls.header} userName={CURRENT_USER.name} role={CURRENT_USER.role} />
            <main className={cls.main}>{children}</main>
        </div>
    );
}
