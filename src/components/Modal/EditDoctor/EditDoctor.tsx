'use client';

import { useForm, Controller } from 'react-hook-form';
import { IMask, IMaskInput } from 'react-imask';

import FormLabel from '@/components/FormLabel/FormLabel';
import Select from '@/components/Select/Select';
import WorkDay from '@/components/WorkDay/WorkDay';
import { CloseIcon } from '@/components/Icons/Buttons/CloseIcon';
import { CheckIcon } from '@/components/Icons/Select/CheckIcon';
import { CATEGORY_ITEMS, SPECIALIZATION_ITEMS } from '@/config/Select.config';
import type { Doctor } from '@/types/doctors.types';
import cls from './EditDoctor.module.css';

interface DoctorFormData {
    name: string;
    surname: string;
    category: Doctor['category'];
    phone: string;
    hours: string;
    day_of_week: number[];
}

interface EditDoctorProps {
    doctor: Doctor;
    onClose: () => void;
    onSave: (data: Partial<Doctor>) => void;
}

export default function EditDoctor({ doctor, onClose, onSave }: EditDoctorProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<DoctorFormData>({
        mode: 'onChange',
        defaultValues: {
            name: doctor.name,
            surname: doctor.surname,
            category: doctor.category,
            phone: doctor.phone ?? '',
            hours: `${doctor.time_start.slice(0, 5)} - ${doctor.time_end.slice(0, 5)}`,
            day_of_week: doctor.day_of_week,
        },
    });

    const specItem = SPECIALIZATION_ITEMS.find((i) => i.spec === doctor.specialization_name);

    const onSubmit = (data: DoctorFormData) => {
        const [timeStart, timeEnd] = data.hours.split(' - ');
        onSave({
            name: data.name.trim(),
            surname: data.surname.trim(),
            category: data.category,
            phone: data.phone,
            time_start: timeStart + ':00',
            time_end: timeEnd + ':00',
            day_of_week: data.day_of_week,
            specialization_id: doctor.specialization_id,
        });
    };

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className="mf-field">
                        <FormLabel label="First name">
                            <input className={cls.input} {...register('name', { required: true })} />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Last name">
                            <input className={cls.input} {...register('surname', { required: true })} />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Specialization">
                            <Select items={SPECIALIZATION_ITEMS} value={specItem?.spec} />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Category">
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        items={CATEGORY_ITEMS}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val as Doctor['category'])}
                                    />
                                )}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Phone">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: true, minLength: 17 }}
                                render={({ field }) => (
                                    <IMaskInput
                                        mask="+00(000) 000-0000"
                                        placeholder="+38(066) 555-0000"
                                        defaultValue={field.value}
                                        onAccept={(val: string) => field.onChange(val)}
                                        inputRef={field.ref}
                                        className={cls.input}
                                    />
                                )}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Working hours">
                            <Controller
                                name="hours"
                                control={control}
                                rules={{ required: true, minLength: 13 }}
                                render={({ field }) => (
                                    <IMaskInput
                                        mask="HH:MM - HH:MM"
                                        blocks={{
                                            HH: { mask: IMask.MaskedRange, from: 0, to: 23 },
                                            MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                                        }}
                                        defaultValue={field.value}
                                        onAccept={(val: string) => field.onChange(val)}
                                        inputRef={field.ref}
                                        className={cls.input}
                                    />
                                )}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field full">
                        <FormLabel label="Working days">
                            <Controller
                                name="day_of_week"
                                control={control}
                                rules={{ validate: (v) => v.length > 0 }}
                                render={({ field }) => <WorkDay initialDays={field.value} onChange={field.onChange} />}
                            />
                        </FormLabel>
                    </div>
                </div>

                <div className={cls.foot}>
                    <button type="button" className={cls.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={cls.saveBtn} disabled={!isValid}>
                        <CheckIcon />
                        <span>Save changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
