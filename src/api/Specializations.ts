import { get, post, del } from './http';

const GET_SPECIALIZATIONS_URL = '/specializations';
const GET_SPECIALIZATIONS_URL_BY_ID = (id: string) => `/specializations/${id}`;

export async function getSpecializations() {
    const res = await get(GET_SPECIALIZATIONS_URL);
    return res.json();
}

export async function createSpecialization(body: unknown) {
    const res = await post(GET_SPECIALIZATIONS_URL, body);
    return res.json();
}

export async function deleteSpecialization(id: string) {
    await del(GET_SPECIALIZATIONS_URL_BY_ID(id));
}
