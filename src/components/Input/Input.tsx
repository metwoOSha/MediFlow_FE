'use client';

import { SearchIcon } from '../Icons/Header/SearchIcon';
import cls from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    style?: React.CSSProperties;
}

export default function Input({ placeholder, style }: InputProps) {
    return (
        <div className={cls.headerSearch} style={style}>
            <span className={cls.field}>
                <SearchIcon />
            </span>
            <input className={cls.input} placeholder={placeholder} type="text" />
        </div>
    );
}
