import type { Doctor, Doctors } from '@/types/doctors.types';
import { get, post, patch, del } from './http';

const GET_DOCTORS_URL = '/doctors';
const GET_DOCTORS_URL_BY_ID = (id: string) => `/doctors/${id}`;

export async function getDoctors(params?: Record<string, string | number>): Promise<Doctors> {
    const res = await get(GET_DOCTORS_URL, params);
    return res.json();
}

export async function getDoctorById(id: string) {
    const res = await get(GET_DOCTORS_URL_BY_ID(id));
    return res.json();
}

export async function addDoctor(body: Omit<Doctor, 'id' | 'created_at' | 'specialization_name'>) {
    const res = await post(GET_DOCTORS_URL, body);
    return res.json();
}

export async function deleteDoctor(id: string) {
    await del(GET_DOCTORS_URL_BY_ID(id));
}

export async function updateDoctor(
    id: string,
    body: Partial<Omit<Doctor, 'id' | 'created_at' | 'specialization_name'>>,
) {
    const res = await patch(`${GET_DOCTORS_URL}/${id}`, body);
    return res.json();
}
