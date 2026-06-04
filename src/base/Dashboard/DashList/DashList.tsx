import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';

const columns = [
    { id: 1, title: 'Patient', width: '36%' },
    { id: 2, title: 'Doctor', width: '32%' },
    { id: 3, title: 'Time', width: '16%' },
    { id: 4, title: 'Status', width: '16%' },
];

const DASH_LIST = [
    {
        id: 1,
        name: 'Dmytro Dobrovolskyi',
        doctor: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        time: '09:30',
        status: 'Confirmed',
    },
    { id: 2, name: 'Sarah Johnson', doctor: 'Dr. James Lee', spec: 'Neurology', time: '11:00', status: 'Pending' },
    { id: 3, name: 'Michael Brown', doctor: 'Dr. Amelia Hart', spec: 'Cardiology', time: '14:15', status: 'Confirmed' },
];

export default function DashList() {
    return <Table columns={columns} data={DASH_LIST} ListItem={ListItem} />;
}
