export interface Doctor {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    specialization_id: string;
    category: 'first' | 'second' | 'highest';
    bio?: string;
    created_at: string;
    specialization_name: string;
    time_start: string;
    time_end: string;
    day_of_week: number[];
}

export interface Doctors {
    doctors: Doctor[];
    total: number;
    page: number;
    limit: number;
}
