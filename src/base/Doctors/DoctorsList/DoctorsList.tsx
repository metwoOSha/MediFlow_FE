'use client';

import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';

const columns = [
    { id: 1, title: 'Doctor', width: '23%' },
    { id: 2, title: 'Specialization', width: '15%' },
    { id: 3, title: 'Category', width: '11%' },
    { id: 4, title: 'Phone', width: '18%' },
    { id: 5, title: 'Schedule', width: '21%' },
    { id: 6, title: 'Actions', width: '12%', align: 'right' as const },
];

export const DOCTORS_LIST = [
    {
        id: 1,
        name: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        category: 'Highest',
        phone: '+1 (415) 555-0142',
        time_start: '09:00',
        time_end: '17:00',
    },
    {
        id: 2,
        name: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        category: 'First',
        phone: '+1 (415) 555-0142',
        time_start: '09:00',
        time_end: '17:00',
    },
    {
        id: 3,
        name: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        category: 'Second',
        phone: '+1 (415) 555-0142',
        time_start: '09:00',
        time_end: '17:00',
    },
];

export default function DoctorsList() {
    return <Table columns={columns} data={DOCTORS_LIST} ListItem={ListItem} />;
}
