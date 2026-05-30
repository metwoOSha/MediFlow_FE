import { SPECIALIZATION_CONFIG } from '@/config/Specializations.config';
import { DefaultIcon } from '@/components/Icons/Specializations/DefaultIcon';

export function getSpecIcon(name: string) {
    return SPECIALIZATION_CONFIG[name] ?? <DefaultIcon />;
}
