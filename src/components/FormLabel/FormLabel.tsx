import cls from './FormLabel.module.css';

export default function FormLabel({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <>
            <span className={cls.label}>{label}</span>
            {children}
        </>
    );
}
