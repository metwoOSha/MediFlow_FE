import DoctorsList from '@/base/Doctors/DoctorsList/DoctorsList';
import FilterBar from '@/base/Doctors/FilterBar/FilterBar';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <DoctorsList />
        </MainLayout>
    );
}
