'use client';

import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';

const columns = [
    { id: 1, title: 'Patient', width: '26%' },
    { id: 2, title: 'Phone', width: '16%' },
    { id: 3, title: 'Appointments', width: '14%' },
    { id: 4, title: 'Registered', width: '15%' },
    { id: 5, title: 'Next Visit', width: '16%' },
    { id: 6, title: 'Actions', width: '13%', align: 'right' as const },
];

const PATIENTS_LIST = [
    {
        id: 1,
        name: 'Olivia Chen',
        email: 'olivia.chen@gmail.com',
        phone: '+1 (415) 555-0142',
        appointments: 7,
        registered: 'Jan 14, 2024',
        next_visit: 'May 31, 2026',
    },
    {
        id: 2,
        name: 'Marcus Johnson',
        email: 'm.johnson@outlook.com',
        phone: '+1 (212) 555-0188',
        appointments: 4,
        registered: 'Mar 02, 2024',
        next_visit: 'Jun 02, 2026',
    },
    {
        id: 3,
        name: 'Sofia Lindqvist',
        email: 'sofia.l@proton.me',
        phone: '+1 (628) 555-0119',
        appointments: 1,
        registered: 'May 19, 2026',
        next_visit: 'May 30, 2026',
    },
    {
        id: 4,
        name: 'Diego Ramirez',
        email: 'diego.ramirez@gmail.com',
        phone: '+1 (917) 555-0273',
        appointments: 12,
        registered: 'Nov 23, 2023',
        next_visit: null,
    },
    {
        id: 5,
        name: 'Yuki Tanaka',
        email: 'yuki.tanaka@icloud.com',
        phone: '+1 (650) 555-0166',
        appointments: 3,
        registered: 'Feb 08, 2025',
        next_visit: 'Jun 04, 2026',
    },
    {
        id: 6,
        name: 'Amara Okonkwo',
        email: 'amara.okonkwo@gmail.com',
        phone: '+1 (305) 555-0301',
        appointments: 6,
        registered: 'Jul 30, 2024',
        next_visit: 'May 31, 2026',
    },
    {
        id: 7,
        name: 'Henrik Solberg',
        email: 'h.solberg@outlook.com',
        phone: '+1 (415) 555-0420',
        appointments: 9,
        registered: 'Sep 12, 2023',
        next_visit: null,
    },
    {
        id: 8,
        name: 'Mei Lin',
        email: 'mei.lin@gmail.com',
        phone: '+1 (480) 555-0987',
        appointments: 1,
        registered: 'May 24, 2026',
        next_visit: 'Jun 01, 2026',
    },
];

export default function PatientsList() {
    return <Table columns={columns} data={PATIENTS_LIST} ListItem={ListItem} />;
}
