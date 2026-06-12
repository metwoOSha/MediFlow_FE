import { post, patch } from './http';

export async function login(email: string, password: string) {
    const res = await post('/auth/login', { email, password });
    return res.json();
}

export async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
}

export async function changePassword(currentPassword: string, newPassword: string) {
    await patch('/auth/password', { currentPassword, newPassword });
}
