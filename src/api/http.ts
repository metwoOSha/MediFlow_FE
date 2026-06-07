const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getAuthHeaders(): Promise<Record<string, string>> {
    if (typeof window === 'undefined') {
        try {
            const { cookies } = await import('next/headers');
            const cookiesStore = await cookies();
            const token = cookiesStore.get('token');
            if (!token) return {};
            return { Cookie: `token=${token.value}` };
        } catch (err) {
            return {};
        }
    }
    return {};
}

async function handleResponse(res: Response): Promise<Response> {
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: `HTTP error: ${res.status}` }));
        throw new Error(error.message);
    }
    return res;
}

export async function get(url: string, params?: Record<string, string | number>): Promise<Response> {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    const res = await fetch(`${BASE_URL}${url}${query}`, {
        credentials: 'include',
        headers: await getAuthHeaders(),
    });
    return handleResponse(res);
}

export async function post(url: string, body: unknown): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeaders()),
        },
        body: JSON.stringify(body),
    });
    return handleResponse(res);
}

export async function patch(url: string, body?: unknown): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeaders()),
        },
        body: JSON.stringify(body),
    });
    return handleResponse(res);
}

export async function del(url: string): Promise<Response> {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: await getAuthHeaders(),
    });
    return handleResponse(res);
}
