import Table from '@/components/Table/Table';
import ListItem from '../ListItem/ListItem';
import type { Appointment } from '@/types/appointments.types';

const columns = [
    { id: 1, title: 'Patient', width: '36%' },
    { id: 2, title: 'Doctor', width: '32%' },
    { id: 3, title: 'Time', width: '16%' },
    { id: 4, title: 'Status', width: '16%' },
];

export default function DashList({ data }: { data: Appointment[] }) {
    if (data.length === 0) {
        return (
            <p
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-3)',
                    fontSize: 13.5,
                    margin: 0,
                }}
            >
                No appointments for today
            </p>
        );
    }

    return <Table columns={columns} data={data} ListItem={ListItem} />;
}
