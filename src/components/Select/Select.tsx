'use client';

import { useEffect, useRef, useState } from 'react';

import cls from './Select.module.css';
import { ArrowIcon } from '../Icons/Select/ArrowIcon';
import SelectOption from '../SelectOption/SelectOption';

interface SelectItem {
    id: number;
    spec: string;
    color?: string;
}

interface SelectProps {
    title: string;
    items: SelectItem[];
}

export default function Select({ title, items }: SelectProps) {
    const [active, setActive] = useState<boolean>(false);
    const [option, setOption] = useState<string>(title);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActive(false);
        };

        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setActive(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onClickOutside);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, []);

    return (
        <div className={cls.select} ref={ref}>
            <button
                type="button"
                className={`${cls.button} ${active && cls.buttonActive}`}
                onClick={() => setActive((prev) => !prev)}
            >
                <span className={cls.spec}>{option}</span>
                <span className={`${cls.arrow} ${active && cls.arrowActive}`}>
                    <ArrowIcon />
                </span>
            </button>

            {active && (
                <ul role="listbox" className={cls.panel}>
                    <SelectOption
                        label={title}
                        isSelected={option === title}
                        onClick={() => {
                            setOption(title);
                            setActive(false);
                        }}
                    />
                    {items.map(({ id, spec, color }) => (
                        <SelectOption
                            key={id}
                            label={spec}
                            isSelected={option === spec}
                            color={color}
                            onClick={() => {
                                setOption(spec);
                                setActive(false);
                            }}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
