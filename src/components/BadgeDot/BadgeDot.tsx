'use client';

import cls from './BadgeDot.module.css';

export default function BadgeDot({ number }: { number: number }) {
    return <span className={cls.badgeDot}>{number}</span>;
}
