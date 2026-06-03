import ChipTabs from '@/components/ChipTabs/ChipTabs';
import cls from './FilterBar.module.css';
import Calendar from '@/components/Calendar/Calendar';
import Buttons from '@/components/Buttons/Buttons';

export default function FilterBar() {
    return (
        <>
            <ChipTabs />
            <div className={cls.spacer}></div>
            <Calendar />
            <Buttons variant="primary" text="New appointment" />
        </>
    );
}
