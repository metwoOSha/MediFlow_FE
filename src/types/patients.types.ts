export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    appointments: number;
    registered: string;
    next_visit: string | null;
}
