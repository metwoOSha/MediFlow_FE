import { cookies } from 'next/headers';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import cls from './AdminLayout.module.css';
import Header from '@/components/Header/Header';
import { decodeJwtPayload } from '@/helpers/decodeJwt';

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const payload = token ? decodeJwtPayload(token) : null;

    const firstName = payload?.name ?? '';
    const lastName = payload?.surname ?? '';
    const fullName = firstName ? `${firstName} ${lastName}`.trim() : 'Unknown';
    const role = payload?.role ?? 'admin';
    const email = payload?.email ?? '';

    return (
        <div className={cls.layout}>
            <Sidebar className={cls.sidebar} userName={fullName} />
            <Header className={cls.header} firstName={firstName} lastName={lastName} role={role} email={email} />
            <main className={cls.main}>{children}</main>
        </div>
    );
}
