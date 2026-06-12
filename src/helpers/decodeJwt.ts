interface JwtPayload {
    id: string;
    role: string;
    name: string;
    surname: string;
    email: string;
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    try {
        const payloadB64 = token.split('.')[1];
        const json = Buffer.from(payloadB64, 'base64url').toString('utf-8');
        return JSON.parse(json) as JwtPayload;
    } catch {
        return null;
    }
}
