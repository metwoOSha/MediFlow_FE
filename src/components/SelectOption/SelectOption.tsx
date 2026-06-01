import { CheckIcon } from '../Icons/Select/CheckIcon';
import cls from './SelectOption.module.css';

interface SelectOptionProps {
    label: string;
    isSelected: boolean;
    color?: string;
    onClick: () => void;
}

export default function SelectOption({ label, isSelected, color, onClick }: SelectOptionProps) {
    return (
        <li
            role="option"
            aria-selected={isSelected}
            className={`${cls.option} ${isSelected ? cls.optionSelected : ''}`}
            onClick={onClick}
        >
            <span
                className={`${cls.dot} ${!color ? cls.empty : ''}`}
                style={color ? { background: color, boxShadow: `0 0 8px ${color}` } : {}}
            />
            <span className={cls.label}>{label}</span>
            {isSelected && <CheckIcon stroke="#5eead4" />}
        </li>
    );
}
