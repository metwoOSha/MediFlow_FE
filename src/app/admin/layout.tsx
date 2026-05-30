import AdminLayout from '../../layout/AdminLayout/AdminLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminLayout>{children}</AdminLayout>
        </>
    );
}
