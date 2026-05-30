'use client';

import Buttons from '@/components/Buttons/Buttons';
import cls from './FilterBar.module.css';

export default function FilterBar() {
    return (
        <>
            <div className={cls.filterInfo}>
                <div className={cls.filterTitle}>9 specializations</div>
                <div className={cls.filterSubTitle}>Manage the medical fields offered at your clinic.</div>
            </div>
            <div className={cls.spacer}></div>
            <Buttons text="Add specialization" variant="primary" />
        </>
    );
}
