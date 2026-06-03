import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';

import cls from './FilterBar.module.css';
import Buttons from '@/components/Buttons/Buttons';

export default function FilterBar() {
    return (
        <>
            <Input placeholder="Search by name or email…" />
            <Select
                title="All patients"
                items={[
                    { id: 1, spec: 'With upcoming visit' },
                    { id: 2, spec: 'No upcoming visit' },
                ]}
            />
            <div className={cls.spacer}></div>
            <Buttons variant="primary" text="Add patient" />
        </>
    );
}
