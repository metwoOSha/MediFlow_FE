import ListItem from '../ListItem/ListItem';
import cls from './DashList.module.css';

const columns = [
    { id: 1, title: 'Patient', width: '36%' },
    { id: 2, title: 'Doctor', width: '32%' },
    { id: 3, title: 'Time', width: '16%' },
    { id: 4, title: 'Status', width: '16%' },
];

export default function DashList() {
    return (
        <div className={cls.tablelock}>
            <div className={cls.tableHead}>
                <table className={cls.table}>
                    <colgroup>
                        {columns.map(({ id, width }) => (
                            <col key={id} style={{ width: `${width}` }}></col>
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {columns.map(({ id, title }) => (
                                <th key={id}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={cls.tableScroll}>
                <table className={cls.table}>
                    <colgroup>
                        {columns.map(({ id, width }) => (
                            <col key={id} style={{ width: `${width}` }}></col>
                        ))}
                    </colgroup>
                    <tbody>
                        <ListItem name="Dmytro Dobrovolskyi" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
