import cls from './PageSkeleton.module.css';

export default function PageSkeleton() {
    return (
        <div className={cls.page}>
            <div className={cls.filterBar}>
                <div className={`${cls.bone} ${cls.filterInput}`} />
                <div className={`${cls.bone} ${cls.filterBtn}`} />
                <div className={`${cls.bone} ${cls.filterBtn}`} />
            </div>
            <div className={cls.table}>
                <div className={cls.thead}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`${cls.bone} ${cls.th}`} />
                    ))}
                </div>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={cls.row}>
                        <div className={cls.cellUser}>
                            <div className={`${cls.bone} ${cls.avatar}`} />
                            <div className={`${cls.bone} ${cls.cellText}`} />
                        </div>
                        {Array.from({ length: 4 }).map((_, j) => (
                            <div key={j} className={`${cls.bone} ${cls.cell}`} />
                        ))}
                    </div>
                ))}
            </div>
            <div className={cls.footer}>
                <div className={`${cls.bone} ${cls.footerText}`} />
                <div className={`${cls.bone} ${cls.footerPag}`} />
            </div>
        </div>
    );
}
