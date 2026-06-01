import { PhoneIcon } from '../Icons/PhoneIcon';

import cls from './Phone.module.css';

export default function Phone({ phone }: { phone: string }) {
    return (
        <span className={cls.phone}>
            <PhoneIcon />
            {phone}
        </span>
    );
}
