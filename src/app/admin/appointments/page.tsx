import FilterBar from '@/base/Appointments/FilterBar/FilterBar';
import AppointmentsList from '@/base/Appointments/AppointmentsList/AppointmentsList';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <AppointmentsList />
        </MainLayout>
    );
}
