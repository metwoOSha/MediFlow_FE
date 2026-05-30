export const HEADER_CONFIG = {
    '/admin': {
        id: 1,
        crumb: 'OVERVIEW',
        title: 'Welcome back, Dr. Reyes',
    },
    '/admin/doctors': {
        id: 2,
        crumb: 'STAFF',
        title: 'Doctors',
    },
    '/admin/appointments': {
        id: 3,
        crumb: 'OPERATIONS',
        title: 'Appointments',
    },
    '/admin/patients': {
        id: 4,
        crumb: 'RECORDS',
        title: 'Patients',
    },
    '/admin/specializations': {
        id: 5,
        crumb: 'CATALOG',
        title: 'Specializations',
    },
} as const;
