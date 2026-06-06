'use client';

import { useEffect, useRef, useState } from 'react';

import cls from './Select.module.css';
import { ArrowIcon } from '../Icons/Select/ArrowIcon';
import SelectOption from '../SelectOption/SelectOption';

interface SelectItem {
    id: number;
    spec: string;
    label?: string;
    color?: string;
}

interface SelectProps {
    title?: string;
    items: SelectItem[];
    value?: string;
    onChange?: (value: string) => void;
}

export default function Select({ title, items, value, onChange }: SelectProps) {
    const [active, setActive] = useState<boolean>(false);

    const initialItem = value ? items.find((i) => i.spec === value) : null;
    const [option, setOption] = useState<string>(
        initialItem ? (initialItem.label ?? initialItem.spec) : (title ?? items[0]?.label ?? items[0]?.spec ?? ''),
    );

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
                    {title && (
                        <SelectOption
                            label={title}
                            isSelected={option === title}
                            onClick={() => {
                                setOption(title);
                                setActive(false);
                                onChange?.('');
                            }}
                        />
                    )}
                    {items.map(({ id, spec, label, color }) => (
                        <SelectOption
                            key={id}
                            label={label ?? spec}
                            isSelected={option === (label ?? spec)}
                            color={color}
                            onClick={() => {
                                setOption(label ?? spec);
                                setActive(false);
                                onChange?.(spec);
                            }}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
