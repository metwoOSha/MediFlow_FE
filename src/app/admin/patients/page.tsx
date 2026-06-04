import FilterBar from '@/base/Patients/FilterBar/FilterBar';
import PatientsList from '@/base/Patients/PatientsList/PatientsList';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default function page() {
    return (
        <MainLayout FilterBar={<FilterBar />}>
            <PatientsList />
        </MainLayout>
    );
}
