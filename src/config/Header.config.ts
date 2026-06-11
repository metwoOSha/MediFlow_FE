export const HEADER_CONFIG = {
    '/admin': {
        id: 1,
        crumb: 'OVERVIEW',
        title: 'Dashboard',
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
    '/admin/settings': {
        id: 6,
        crumb: 'SYSTEM',
        title: 'Settings',
    },
} as const;
