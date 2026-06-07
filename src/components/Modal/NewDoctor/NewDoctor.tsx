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
import type { Specialization } from '@/types/specializations.types';
import cls from './NewDoctor.module.css';

interface DoctorFormData {
    name: string;
    surname: string;
    specialization_id: string;
    category: Doctor['category'];
    phone: string;
    hours: string;
    day_of_week: number[];
}

interface NewDoctorProps {
    specializations: Specialization[];
    onClose: () => void;
    onSave: (data: Omit<Doctor, 'id' | 'created_at' | 'specialization_name'>) => void;
}

export default function NewDoctor({ specializations, onClose, onSave }: NewDoctorProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<DoctorFormData>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            surname: '',
            specialization_id: specializations[0]?.id ?? '',
            category: 'highest',
            phone: '',
            hours: '09:00 - 17:00',
            day_of_week: [1, 2, 3, 4, 5],
        },
    });

    const specItems = specializations.map((s, i) => ({
        id: i + 1,
        spec: s.id,
        label: s.specialization_name,
        color: SPECIALIZATION_ITEMS.find((si) => si.spec === s.specialization_name)?.color ?? '#6366f1',
    }));

    const onSubmit = (data: DoctorFormData) => {
        const [timeStart, timeEnd] = data.hours.split(' - ');
        onSave({
            name: data.name.trim(),
            surname: data.surname.trim(),
            specialization_id: data.specialization_id,
            category: data.category,
            phone: data.phone,
            time_start: timeStart + ':00',
            time_end: timeEnd + ':00',
            day_of_week: data.day_of_week,
        });
    };

    return (
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.head}>
                <div className={cls.titleWrap}>
                    <span className={cls.eyebrow}>Doctors</span>
                    <span className={cls.title}>New Doctor</span>
                </div>
                <button type="button" aria-label="close" className={cls.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form}>
                    <div className="mf-field">
                        <FormLabel label="First name">
                            <input
                                className={cls.input}
                                placeholder="e.g. Dmytro"
                                {...register('name', { required: true })}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Last name">
                            <input
                                className={cls.input}
                                placeholder="e.g. Hart"
                                {...register('surname', { required: true })}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Specialization">
                            <Controller
                                name="specialization_id"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select items={specItems} value={field.value} onChange={field.onChange} />
                                )}
                            />
                        </FormLabel>
                    </div>
                    <div className="mf-field">
                        <FormLabel label="Category">
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: true }}
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
                        <span>Add doctor</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
