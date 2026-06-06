import FormLabel from '@/components/FormLabel/FormLabel';
import cls from './NewDoctor.module.css';
import Select from '@/components/Select/Select';
import { CATEGORY_ITEMS, SPECIALIZATION_ITEMS } from '@/config/Select.config';

import { IMask, IMaskInput } from 'react-imask';
import WorkDay from '@/components/WorkDay/WorkDay';

export default function NewDoctor() {
    return (
        <>
            <div className="mf-field">
                <FormLabel label="First name">
                    <input className={cls.input} placeholder="e.g. Dmytro" />
                </FormLabel>
            </div>
            <div className="mf-field">
                <FormLabel label="Last name">
                    <input className={cls.input} placeholder="e.g. Hart" />
                </FormLabel>
            </div>
            <div className="mf-field">
                <FormLabel label="Specialization">
                    <Select items={SPECIALIZATION_ITEMS} />
                </FormLabel>
            </div>
            <div className="mf-field">
                <FormLabel label="Category">
                    <Select items={CATEGORY_ITEMS} />
                </FormLabel>
            </div>
            <div className="mf-field">
                <FormLabel label="Phone">
                    <IMaskInput mask="+00(000) 000-0000" defaultValue="+38(066) 555-0000" className={cls.input} />
                </FormLabel>
            </div>
            <div className="mf-field">
                <FormLabel label="Working hours">
                    <IMaskInput
                        mask="HH:MM - HH:MM"
                        blocks={{
                            HH: { mask: IMask.MaskedRange, from: 0, to: 23 },
                            MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                        }}
                        defaultValue="09:00 - 17:00"
                        className={cls.input}
                    />
                </FormLabel>
            </div>
            <div className="mf-field full">
                <WorkDay />
            </div>
        </>
    );
}
