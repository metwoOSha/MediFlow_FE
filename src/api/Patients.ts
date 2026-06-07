import { get, post, patch, del } from './http';
import type { Patient } from '@/types/patients.types';

const PATIENTS_URL = '/patients';
const PATIENT_URL = (id: string) => `/patients/${id}`;

export async function getPatients(): Promise<Patient[]> {
    const res = await get(PATIENTS_URL);
    return res.json();
}

export async function createPatient(body: Pick<Patient, 'name' | 'email' | 'phone'>) {
    const res = await post(PATIENTS_URL, body);
    return res.json();
}

export async function updatePatient(id: string, body: Partial<Pick<Patient, 'name' | 'email' | 'phone'>>) {
    const res = await patch(PATIENT_URL(id), body);
    return res.json();
}

export async function deletePatient(id: string) {
    await del(PATIENT_URL(id));
}
