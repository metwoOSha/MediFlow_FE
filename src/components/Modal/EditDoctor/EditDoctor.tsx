'use client';

import { useState } from 'react';
import { IMask, IMaskInput } from 'react-imask';

import FormLabel from '@/components/FormLabel/FormLabel';
import Select from '@/components/Select/Select';
import WorkDay from '@/components/WorkDay/WorkDay';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import { CATEGORY_ITEMS, SPECIALIZATION_ITEMS } from '@/config/Select.config';
import type { Doctor } from '@/types/doctors.types';
import cls from './EditDoctor.module.css';

interface EditDoctorProps {
    doctor: Doctor;
    onClose: () => void;
    onSave: (data: Partial<Doctor>) => void;
}

export default function EditDoctor({ doctor, onClose, onSave }: EditDoctorProps) {
    const [name, setName] = useState(doctor.name);
    const [surname, setSurname] = useState(doctor.surname);
    const [category, setCategory] = useState(doctor.category);
    const [phone, setPhone] = useState(doctor.phone ?? '');
    const [hours, setHours] = useState(`${doctor.time_start.slice(0, 5)} - ${doctor.time_end.slice(0, 5)}`);
    const [days, setDays] = useState<number[]>(doctor.day_of_week);

    const handleSave = () => {
        const [timeStart, timeEnd] = hours.split(' - ');
        onSave({
            name: name.trim(),
            surname: surname.trim(),
            category: category as Doctor['category'],
            phone,
            time_start: timeStart + ':00',
            time_end: timeEnd + ':00',
            day_of_week: days,
            specialization_id: doctor.specialization_id,
        });
    };

    const specItem = SPECIALIZATION_ITEMS.find((i) => i.spec === doctor.specialization_name);

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Edit Doctor</span>
                    <span className={cls.title}>
                        Dr. {doctor.name} {doctor.surname}
                    </span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className={cls.form}>
                <div className="mf-field">
                    <FormLabel label="First name">
                        <input className={cls.input} value={name} onChange={(e) => setName(e.target.value)} />
                    </FormLabel>
                </div>
                <div className="mf-field">
                    <FormLabel label="Last name">
                        <input className={cls.input} value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </FormLabel>
                </div>
                <div className="mf-field">
                    <FormLabel label="Specialization">
                        <Select items={SPECIALIZATION_ITEMS} value={specItem?.spec} />
                    </FormLabel>
                </div>
                <div className="mf-field">
                    <FormLabel label="Category">
                        <Select
                            items={CATEGORY_ITEMS}
                            value={doctor.category}
                            onChange={(val) => setCategory(val as Doctor['category'])}
                        />
                    </FormLabel>
                </div>
                <div className="mf-field">
                    <FormLabel label="Phone">
                        <IMaskInput
                            mask="+0 (000) 000-0000"
                            value={phone}
                            onAccept={(val: string) => setPhone(val)}
                            className={cls.input}
                        />
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
                            value={hours}
                            onAccept={(val: string) => setHours(val)}
                            className={cls.input}
                        />
                    </FormLabel>
                </div>
                <div className="mf-field full">
                    <FormLabel label="Working days">
                        <WorkDay initialDays={days} onChange={setDays} />
                    </FormLabel>
                </div>
            </div>

            <div className={cls.foot}>
                <button type="button" className={cls.cancelBtn} onClick={onClose}>
                    Cancel
                </button>
                <button type="button" className={cls.saveBtn} onClick={handleSave}>
                    <CheckIcon />
                    <span>Save changes</span>
                </button>
            </div>
        </div>
    );
}
