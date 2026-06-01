'use client';

import ListItem from '../ListItem/ListItem';
import cls from './DoctorsList.module.css';

const columns = [
    { id: 1, title: 'Doctor', width: '23%' },
    { id: 2, title: 'Specialization', width: '15%' },
    { id: 3, title: 'Category', width: '11%' },
    { id: 4, title: 'Phone', width: '18%' },
    { id: 5, title: 'Schedule', width: '21%' },
    { id: 6, title: 'Actions', width: '12%' },
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
        category: 'Highest',
        phone: '+1 (415) 555-0142',
        time_start: '09:00',
        time_end: '17:00',
    },
    {
        id: 3,
        name: 'Dr. Amelia Hart',
        spec: 'Cardiology',
        category: 'Highest',
        phone: '+1 (415) 555-0142',
        time_start: '09:00',
        time_end: '17:00',
    },
];

export default function DoctorsList() {
    return (
        <div className={cls.tableBlock}>
            <div className={cls.tableHead}>
                <table className={cls.table}>
                    <colgroup>
                        {columns.map(({ id, width }) => (
                            <col key={id} style={{ width: `${width}` }} />
                        ))}
                    </colgroup>
                    <thead className={cls.thead}>
                        <tr>
                            {columns.map(({ id, title }, index) => (
                                <th
                                    key={id}
                                    className={cls.th}
                                    style={{ textAlign: index === columns.length - 1 ? 'right' : 'left' }}
                                >
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={cls.tableBody}>
                <table className={cls.table}>
                    <colgroup>
                        {columns.map(({ id, width }) => (
                            <col key={id} style={{ width: `${width}` }} />
                        ))}
                    </colgroup>
                    <tbody>
                        {DOCTORS_LIST.map((item) => (
                            <ListItem key={item.id} {...item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
