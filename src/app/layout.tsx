import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MediFlow',
    description: 'MediFlow application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
