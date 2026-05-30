import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MediFlow',
    description: 'MediFlow application',
};

import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={jakarta.variable}>
            <body>{children}</body>
        </html>
    );
}
