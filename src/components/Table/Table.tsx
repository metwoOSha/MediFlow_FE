import React from 'react';
import cls from './Table.module.css';

interface Column {
    id: number;
    title: string;
    width: string;
    align?: 'left' | 'right';
}

interface TableProps<T extends { id: number | string }> {
    columns: Column[];
    data: T[];
    ListItem: React.ComponentType<T>;
}

export default function Table<T extends { id: number | string }>({ columns, data, ListItem }: TableProps<T>) {
    return (
        <div className={cls.tableBlock}>
            <div className={cls.tableHead}>
                <table className={cls.table}>
                    <colgroup>
                        {columns.map(({ id, width }) => (
                            <col key={id} style={{ width }} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {columns.map(({ id, title, align }) => (
                                <th key={id} className={cls.th} style={{ textAlign: align ?? 'left' }}>
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
                            <col key={id} style={{ width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        {data.map((item) => (
                            <ListItem key={item.id} {...(item as T)} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
