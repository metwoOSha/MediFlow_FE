import { post } from './http';

export async function login(email: string, password: string) {
    const res = await post('/auth/login', { email, password });
    return res.json();
}

export async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
}
