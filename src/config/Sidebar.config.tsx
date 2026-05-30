import type { NavItem } from '@/types/Sidebar.types';

import { DashboardIcon } from '@/components/Icons/Sidebar/DashboardIcon';
import { DoctorIcon } from '@/components/Icons/Sidebar/DoctorIcon';
import { AppointmentsIcon } from '@/components/Icons/Sidebar/AppointmentsIcon';
import { PatientsIcon } from '@/components/Icons/Sidebar/PatientsIcon';
import { SpecializationsIcon } from '@/components/Icons/Sidebar/SpecializationsIcon';
import { SettingsIcon } from '@/components/Icons/Sidebar/SettingsIcon';

export const WORKSPACE_NAV_ITEMS: NavItem[] = [
    { id: 1, label: 'Dashboard', icon: <DashboardIcon />, href: '/admin' },
    { id: 2, label: 'Doctors', icon: <DoctorIcon />, href: '/admin/doctors' },
    { id: 3, label: 'Appointments', icon: <AppointmentsIcon />, href: '/admin/appointments' },
    { id: 4, label: 'Patients', icon: <PatientsIcon />, href: '/admin/patients' },
    { id: 5, label: 'Specializations', icon: <SpecializationsIcon />, href: '/admin/specializations' },
];

export const SYSTEM_NAV_ITEMS: NavItem[] = [
    { id: 1, label: 'Settings', icon: <SettingsIcon />, href: '/admin/settings' },
];
